import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTask } from './new-task.model';

@Component({
    selector: 'app-new-task',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './new-task.component.html',
    styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
    @Output() cancel = new EventEmitter<void>();
    @Output() add = new EventEmitter<NewTask>();
    enteredTitle: string = '';
    enteredSummary: string = '';
    enteredDate: string = '';

    onCancel() {
        this.cancel.emit();
    }

    onSubmit() {
        this.add.emit({
            title: this.enteredTitle,
            summary: this.enteredSummary,
            date: this.enteredDate,
        });
    }
}
