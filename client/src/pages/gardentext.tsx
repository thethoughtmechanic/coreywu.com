
export default function GardenText() {
  const animations = [
    {
      id: 'current',
      name: 'Current Vines',
      description: 'The existing vine animation',
      className: 'garden-text-current'
    },
    {
      id: 'bloom',
      name: 'Blooming Flowers',
      description: 'Flowers bloom around the text',
      className: 'garden-text-bloom'
    },
    {
      id: 'sparkle',
      name: 'Nature Sparkle',
      description: 'Gentle sparkles that appear and fade',
      className: 'garden-text-sparkle'
    },
    {
      id: 'glow',
      name: 'Garden Glow',
      description: 'A soft green glow that pulses',
      className: 'garden-text-glow'
    },
    {
      id: 'leaves',
      name: 'Falling Leaves',
      description: 'Leaves gently fall around the text',
      className: 'garden-text-leaves'
    },
    {
      id: 'grow',
      name: 'Text Growth',
      description: 'Text grows like a plant',
      className: 'garden-text-grow'
    },
    {
      id: 'wave',
      name: 'Garden Wave',
      description: 'A subtle wave effect through the letters',
      className: 'garden-text-wave'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-light text-warm-brown mb-6">
          Garden Text Animations
        </h1>
        <p className="text-muted-grey max-w-2xl mx-auto leading-relaxed">
          Choose your favorite animation for the "garden" text on the homepage. 
          Hover over each option to see the effect in action.
        </p>
      </header>

      <div className="grid gap-8 md:gap-12">
        {animations.map((animation) => (
          <div key={animation.id} className="text-center p-8 bg-light-brown rounded-xl border border-warm-brown/20">
            <h2 className="text-xl font-medium text-warm-brown mb-2">
              {animation.name}
            </h2>
            <p className="text-sm text-muted-grey mb-6">
              {animation.description}
            </p>
            
            <div className="text-3xl md:text-4xl font-light text-warm-brown leading-tight">
              Welcome to my digital{' '}
              <span className={`${animation.className} relative inline-block cursor-pointer`}>
                garden
              </span>
              .
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-muted-grey">
          Once you choose your favorite, I can update the homepage with that animation.
        </p>
      </div>
    </div>
  );
}
