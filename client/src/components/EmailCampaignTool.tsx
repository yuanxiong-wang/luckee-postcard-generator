/**
 * Email Campaign Tool Component
 * 
 * Allows users to:
 * - Select a postcard/holiday
 * - Customize the email message
 * - Add recipients to mailing list
 * - Schedule email delivery for upcoming holidays
 */

import { useState } from 'react';
import { Holiday } from '@/lib/holidays';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Plus, Trash2, Calendar, Send } from 'lucide-react';
import { toast } from 'sonner';

interface EmailCampaign {
  id: string;
  holidayId: string;
  holidayName: string;
  subject: string;
  message: string;
  recipients: string[];
  scheduledDate?: string;
  createdAt: Date;
}

interface EmailCampaignToolProps {
  holiday: Holiday;
  greeting: string;
}

export function EmailCampaignTool({ holiday, greeting }: EmailCampaignToolProps) {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newRecipient, setNewRecipient] = useState('');
  const [subject, setSubject] = useState(`Seasonal Greetings from Luckee - ${holiday.name}`);
  const [message, setMessage] = useState(
    `Dear Friend,\n\nWishing you a wonderful ${holiday.name}!\n\n${greeting}\n\nWarm regards,\nThe Luckee Team`
  );
  const [recipients, setRecipients] = useState<string[]>([]);
  const [scheduledDate, setScheduledDate] = useState('');

  const addRecipient = () => {
    if (!newRecipient.trim()) {
      toast.error('Please enter an email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newRecipient)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (recipients.includes(newRecipient)) {
      toast.error('This email is already in the list');
      return;
    }

    setRecipients([...recipients, newRecipient]);
    setNewRecipient('');
    toast.success('Recipient added');
  };

  const removeRecipient = (email: string) => {
    setRecipients(recipients.filter((r) => r !== email));
  };

  const createCampaign = () => {
    if (recipients.length === 0) {
      toast.error('Please add at least one recipient');
      return;
    }

    if (!subject.trim() || !message.trim()) {
      toast.error('Please fill in subject and message');
      return;
    }

    const campaign: EmailCampaign = {
      id: `campaign-${Date.now()}`,
      holidayId: holiday.id,
      holidayName: holiday.name,
      subject,
      message,
      recipients: [...recipients],
      scheduledDate: scheduledDate || undefined,
      createdAt: new Date(),
    };

    setCampaigns([...campaigns, campaign]);
    
    // Reset form
    setRecipients([]);
    setNewRecipient('');
    setSubject(`Seasonal Greetings from Luckee - ${holiday.name}`);
    setMessage(
      `Dear Friend,\n\nWishing you a wonderful ${holiday.name}!\n\n${greeting}\n\nWarm regards,\nThe Luckee Team`
    );
    setScheduledDate('');
    setShowForm(false);

    toast.success(`Campaign created for ${recipients.length} recipient(s)`);
  };

  const deleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter((c) => c.id !== id));
    toast.success('Campaign deleted');
  };

  return (
    <div className="w-full bg-white rounded-lg border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Mail className="w-6 h-6" />
          Email Campaign Tool
        </h2>
        <Button
          onClick={() => setShowForm(!showForm)}
          variant={showForm ? 'destructive' : 'default'}
        >
          {showForm ? 'Cancel' : 'Create Campaign'}
        </Button>
      </div>

      {showForm && (
        <div className="bg-secondary/30 rounded-lg p-6 mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Email subject line"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email Message</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Compose your email message..."
              className="w-full min-h-32"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Schedule Delivery (Optional)</label>
            <input
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Leave blank to send immediately
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Recipients</label>
            <div className="flex gap-2 mb-3">
              <input
                type="email"
                value={newRecipient}
                onChange={(e) => setNewRecipient(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addRecipient()}
                placeholder="Enter email address"
                className="flex-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button onClick={addRecipient} size="sm" variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {recipients.length > 0 && (
              <div className="space-y-2 mb-4">
                {recipients.map((email) => (
                  <div
                    key={email}
                    className="flex items-center justify-between bg-card p-2 rounded border border-border"
                  >
                    <span className="text-sm">{email}</span>
                    <button
                      onClick={() => removeRecipient(email)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <p className="text-xs text-muted-foreground">
              {recipients.length} recipient{recipients.length !== 1 ? 's' : ''} added
            </p>
          </div>

          <Button onClick={createCampaign} className="w-full" size="lg">
            <Send className="w-4 h-4 mr-2" />
            Create Campaign
          </Button>
        </div>
      )}

      {campaigns.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Active Campaigns</h3>
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-card border border-border rounded-lg p-4 space-y-2"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{campaign.holidayName}</h4>
                  <p className="text-sm text-muted-foreground">{campaign.subject}</p>
                </div>
                <button
                  onClick={() => deleteCampaign(campaign.id)}
                  className="text-destructive hover:text-destructive/80"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-sm text-muted-foreground space-y-1">
                <p>Recipients: {campaign.recipients.length}</p>
                {campaign.scheduledDate && (
                  <p className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Scheduled: {new Date(campaign.scheduledDate).toLocaleDateString()}
                  </p>
                )}
              </div>

              <div className="text-xs bg-muted p-2 rounded max-h-20 overflow-y-auto whitespace-pre-wrap">
                {campaign.message}
              </div>
            </div>
          ))}
        </div>
      )}

      {!showForm && campaigns.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Mail className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No campaigns yet. Create one to get started!</p>
        </div>
      )}
    </div>
  );
}
