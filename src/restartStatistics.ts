export interface IRestartStatistics{
    Fail(): void;
    IsWithinDuration(withinMs: number): void;
    Reset(): void;
    FailureCount: number;
}

export class RestartStatistics implements IRestartStatistics {
    public FailureCount = 0;
    private LastFailureTime: Date;
    Fail() {
        this.FailureCount++
    }

    Reset() {
        this.FailureCount = 0
    }

    Restart() {
        this.LastFailureTime = new Date()
    }

    IsWithinDuration(withinMs: number) {
        return (new Date().getTime() - this.LastFailureTime.getTime()) < withinMs;
    }
}