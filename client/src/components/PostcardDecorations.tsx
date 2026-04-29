/**
 * PostcardDecorations Component
 * 
 * Renders SVG-based decorative elements for postcards based on holiday theme.
 * Elements are positioned asymmetrically to create organic, hand-drawn aesthetic.
 */

interface DecorationsProps {
  elements: string[];
  colors: {
    accent: string;
    accentLight: string;
  };
}

export function PostcardDecorations({ elements, colors }: DecorationsProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {elements.map((element, index) => (
        <DecorElement
          key={index}
          type={element}
          position={getPositionForIndex(index)}
          colors={colors}
        />
      ))}
    </div>
  );
}

interface DecorElementProps {
  type: string;
  position: { top: string; right?: string; left?: string; opacity: number };
  colors: { accent: string; accentLight: string };
}

function DecorElement({ type, position, colors }: DecorElementProps) {
  const svgProps = {
    className: 'absolute',
    style: {
      top: position.top,
      right: position.right,
      left: position.left,
      opacity: position.opacity,
    },
  };

  switch (type) {
    case 'pine-branches':
      return (
        <svg {...svgProps} width="140" height="120" viewBox="0 0 140 120">
          <path
            d="M 10 60 Q 35 35 60 45 Q 85 55 110 35 Q 125 25 135 40"
            stroke={colors.accent}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="15" cy="75" r="5" fill={colors.accent} />
          <circle cx="30" cy="65" r="6" fill={colors.accent} />
          <circle cx="50" cy="70" r="5" fill={colors.accent} />
          <circle cx="75" cy="65" r="6" fill={colors.accent} />
          <circle cx="100" cy="60" r="5" fill={colors.accent} />
          <circle cx="120" cy="55" r="6" fill={colors.accent} />
        </svg>
      );

    case 'holly-berries':
      return (
        <svg {...svgProps} width="100" height="100" viewBox="0 0 100 100">
          <circle cx="25" cy="25" r="7" fill={colors.accent} />
          <circle cx="50" cy="18" r="8" fill={colors.accent} />
          <circle cx="75" cy="25" r="7" fill={colors.accent} />
          <circle cx="35" cy="40" r="6" fill={colors.accent} />
          <circle cx="65" cy="40" r="6" fill={colors.accent} />
          <path
            d="M 20 50 L 32 45 L 42 50 L 35 62 Z"
            fill={colors.accentLight}
            opacity="0.7"
          />
          <path
            d="M 58 50 L 70 45 L 80 50 L 73 62 Z"
            fill={colors.accentLight}
            opacity="0.7"
          />
        </svg>
      );

    case 'snowflakes':
      return (
        <svg {...svgProps} width="70" height="70" viewBox="0 0 70 70">
          <g stroke={colors.accentLight} strokeWidth="2" fill="none">
            <line x1="35" y1="5" x2="35" y2="65" />
            <line x1="5" y1="35" x2="65" y2="35" />
            <line x1="12" y1="12" x2="58" y2="58" />
            <line x1="58" y1="12" x2="12" y2="58" />
            <line x1="35" y1="15" x2="25" y2="25" />
            <line x1="35" y1="15" x2="45" y2="25" />
            <line x1="35" y1="55" x2="25" y2="45" />
            <line x1="35" y1="55" x2="45" y2="45" />
          </g>
        </svg>
      );

    case 'ornaments':
      return (
        <svg {...svgProps} width="90" height="110" viewBox="0 0 90 110">
          <circle cx="25" cy="50" r="15" fill={colors.accent} />
          <circle cx="25" cy="50" r="12" fill={colors.accentLight} opacity="0.5" />
          <rect x="21" y="32" width="8" height="10" fill={colors.accent} />
          <circle cx="60" cy="60" r="17" fill={colors.accentLight} />
          <circle cx="60" cy="60" r="14" fill={colors.accent} opacity="0.7" />
          <rect x="56" y="40" width="8" height="10" fill={colors.accent} />
          <circle cx="45" cy="35" r="12" fill={colors.accent} opacity="0.6" />
          <rect x="42" y="20" width="6" height="8" fill={colors.accent} />
        </svg>
      );

    case 'candy-canes':
      return (
        <svg {...svgProps} width="60" height="120" viewBox="0 0 60 120">
          <path
            d="M 20 20 Q 20 60 35 75 Q 50 90 50 110"
            stroke={colors.accent}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 20 22 Q 20 60 35 75 Q 50 90 50 108"
            stroke={colors.accentLight}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
      );

    case 'hearts':
      return (
        <svg {...svgProps} width="70" height="70" viewBox="0 0 70 70">
          <path
            d="M 35 60 C 18 48 12 36 12 24 C 12 14 18 8 26 8 C 30 8 35 12 35 12 C 35 12 40 8 44 8 C 52 8 58 14 58 24 C 58 36 52 48 35 60 Z"
            fill={colors.accent}
          />
        </svg>
      );

    case 'roses':
      return (
        <svg {...svgProps} width="70" height="100" viewBox="0 0 70 100">
          <circle cx="35" cy="25" r="10" fill={colors.accent} />
          <circle cx="25" cy="32" r="7" fill={colors.accentLight} opacity="0.8" />
          <circle cx="45" cy="32" r="7" fill={colors.accentLight} opacity="0.8" />
          <path
            d="M 35 42 Q 28 58 28 80 Q 35 92 42 80 Q 42 58 35 42"
            stroke={colors.accentLight}
            strokeWidth="2.5"
            fill="none"
          />
        </svg>
      );

    case 'shamrocks':
      return (
        <svg {...svgProps} width="80" height="80" viewBox="0 0 80 80">
          <circle cx="28" cy="28" r="9" fill={colors.accent} />
          <circle cx="52" cy="28" r="9" fill={colors.accent} />
          <circle cx="40" cy="48" r="9" fill={colors.accent} />
          <path
            d="M 40 57 L 40 72"
            stroke={colors.accent}
            strokeWidth="2.5"
          />
        </svg>
      );

    case 'pumpkins':
      return (
        <svg {...svgProps} width="100" height="90" viewBox="0 0 100 90">
          <circle cx="28" cy="50" r="18" fill={colors.accent} />
          <circle cx="28" cy="50" r="15" fill={colors.accentLight} opacity="0.4" />
          <path d="M 28 28 L 28 22" stroke={colors.accent} strokeWidth="2.5" />
          <circle cx="65" cy="55" r="15" fill={colors.accent} />
          <circle cx="65" cy="55" r="12" fill={colors.accentLight} opacity="0.4" />
          <path d="M 65 37 L 65 30" stroke={colors.accent} strokeWidth="2.5" />
        </svg>
      );

    case 'fireworks':
      return (
        <svg {...svgProps} width="100" height="100" viewBox="0 0 100 100">
          <g stroke={colors.accent} strokeWidth="2" fill="none">
            <line x1="50" y1="50" x2="50" y2="15" />
            <line x1="50" y1="50" x2="72" y2="28" />
            <line x1="50" y1="50" x2="85" y2="50" />
            <line x1="50" y1="50" x2="72" y2="72" />
            <line x1="50" y1="50" x2="50" y2="85" />
            <line x1="50" y1="50" x2="28" y2="72" />
            <line x1="50" y1="50" x2="15" y2="50" />
            <line x1="50" y1="50" x2="28" y2="28" />
          </g>
        </svg>
      );

    case 'sunflowers':
      return (
        <svg {...svgProps} width="90" height="110" viewBox="0 0 90 110">
          <circle cx="45" cy="45" r="10" fill={colors.accent} />
          <circle cx="45" cy="20" r="6" fill={colors.accentLight} />
          <circle cx="65" cy="27" r="6" fill={colors.accentLight} />
          <circle cx="70" cy="45" r="6" fill={colors.accentLight} />
          <circle cx="65" cy="63" r="6" fill={colors.accentLight} />
          <circle cx="45" cy="70" r="6" fill={colors.accentLight} />
          <circle cx="25" cy="63" r="6" fill={colors.accentLight} />
          <circle cx="20" cy="45" r="6" fill={colors.accentLight} />
          <circle cx="25" cy="27" r="6" fill={colors.accentLight} />
          <path
            d="M 45 55 Q 45 80 45 105"
            stroke={colors.accentLight}
            strokeWidth="2.5"
            fill="none"
          />
        </svg>
      );

    case 'easter-eggs':
      return (
        <svg {...svgProps} width="100" height="90" viewBox="0 0 100 90">
          <ellipse cx="28" cy="50" rx="12" ry="18" fill={colors.accent} />
          <ellipse cx="28" cy="50" rx="10" ry="16" fill={colors.accentLight} opacity="0.6" />
          <ellipse cx="65" cy="45" rx="14" ry="20" fill={colors.accentLight} />
          <ellipse cx="65" cy="45" rx="12" ry="18" fill={colors.accent} opacity="0.7" />
        </svg>
      );

    case 'confetti':
      return (
        <svg {...svgProps} width="100" height="100" viewBox="0 0 100 100">
          <rect x="12" y="10" width="6" height="12" fill={colors.accent} />
          <rect x="40" y="15" width="6" height="12" fill={colors.accentLight} />
          <rect x="70" y="20" width="6" height="12" fill={colors.accent} />
          <circle cx="25" cy="60" r="5" fill={colors.accentLight} />
          <circle cx="60" cy="65" r="5" fill={colors.accent} />
          <circle cx="85" cy="55" r="5" fill={colors.accentLight} />
          <polygon points="18,85 24,72 30,85" fill={colors.accent} />
          <polygon points="55,90 62,75 68,90" fill={colors.accentLight} />
        </svg>
      );

    default:
      return null;
  }
}

/**
 * Determine position for decoration elements to create asymmetric layout
 */
function getPositionForIndex(
  index: number
): { top: string; right?: string; left?: string; opacity: number } {
  const positions = [
    { top: '8%', right: '6%', opacity: 0.9 },
    { top: '18%', right: '15%', opacity: 0.75 },
    { top: '32%', left: '10%', opacity: 0.8 },
    { top: '48%', right: '4%', opacity: 0.65 },
    { top: '62%', left: '8%', opacity: 0.7 },
    { top: '75%', right: '12%', opacity: 0.8 },
  ];

  return positions[index % positions.length];
}
