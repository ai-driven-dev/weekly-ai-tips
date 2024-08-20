import NewsletterForm from './NewsletterForm';

export default function Newsletter() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="py-12 px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Elevate Your Coding Game
          </h1>
          <p className="mt-4 text-lg md:text-xl lg:text-2xl font-normal text-muted-foreground">
            Stay ahead of the curve with our free weekly AI coding tips for
            developers.
          </p>
        </div>
      </header>
      <main className="flex-1 px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <NewsletterForm />
          <div className="space-y-4">
            <h2 className="text-2xl font-bold font-serif tracking-tight text-foreground">
              Benefits
            </h2>
            <ul className="list-disc pl-4 space-y-2 text-muted-foreground">
              <li>Immediate application of cutting-edge AI techniques</li>
              <li>Expert insights from industry leaders</li>
              <li>Stay competitive in the ever-evolving tech landscape</li>
              <li>Free and spam-free, straight to your inbox</li>
            </ul>
          </div>
        </div>
      </main>
      <footer className="py-6 px-4 md:px-6 lg:px-8 border-t border-border">
        <p className="text-sm text-muted-foreground text-center">
          &copy; 2024 AI Coding Tips. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
