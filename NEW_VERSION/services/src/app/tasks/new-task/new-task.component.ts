import { Component, ElementRef, output, viewChild } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';

@Component({
    selector: 'app-new-task',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './new-task.component.html',
    styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
    private formEl = viewChild<ElementRef<HTMLFormElement>>('form');

    constructor(private taskService: TasksService) {}

    onAddTask(title: string, description: string) {
        if (title.trim() === '' || description.trim() === '') {
            return;
        }

        this.taskService.addTask({ title, description });
        this.formEl()?.nativeElement.reset();
    }
}
