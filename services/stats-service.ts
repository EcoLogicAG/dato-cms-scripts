export class StatsService {
    stats = {
        updated: [],
        nothingToDo: [],
        errors: []
    };

    public addUpdated(msg: string) {
        this.stats.updated.push(msg);
    }

    public addNothingToDo(msg: string) {
        this.stats.nothingToDo.push(msg);
    }

    public addError(msg: string) {
        this.stats.errors.push(msg);
    }

    public printStats() {
        console.log('='.repeat(15) + ' Nothing To Do ' + '='.repeat(15));
        this.stats.nothingToDo.forEach((logMessage) => console.log(logMessage));
        console.log('='.repeat(15) + '    Updated    ' + '='.repeat(15));
        this.stats.updated.forEach((logMessage) => console.log(logMessage));
        console.log('='.repeat(15) + '     Error     ' + '='.repeat(15));
        this.stats.errors.forEach((logMessage) => console.log(logMessage));
        console.log('='.repeat(45));
        console.log(`${this.stats.nothingToDo.length} nothing to do`);
        console.log(`${this.stats.updated.length} updated`);
        console.log(`${this.stats.errors.length} errors`);
    }
}
