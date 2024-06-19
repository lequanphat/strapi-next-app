'use client';
const ErrorBoundary = ({ error, reset }: { error: Error, reset: () => void }) => {

    return (
        <div className="py-16 flex flex-col items-center justify-center gap-8">
            <p className="text-[red]">{error.message}</p>
            <button onClick={reset}>Try again!!!</button>
        </div>
    );
};

export default ErrorBoundary;
