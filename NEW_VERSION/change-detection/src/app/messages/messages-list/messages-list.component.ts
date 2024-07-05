import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    inject,
    OnInit,
} from '@angular/core';
import { MessagesService } from '../messages.service';

@Component({
    selector: 'app-messages-list',
    standalone: true,
    imports: [],
    templateUrl: './messages-list.component.html',
    styleUrl: './messages-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesListComponent implements OnInit {
    private messagesService = inject(MessagesService);

    private cdRef = inject(ChangeDetectorRef);
    private destroyRef = inject(DestroyRef);

    messages: string[] = [];

    get debugOutput() {
        console.log('[MessagesList] "debugOutput" binding re-evaluated.');
        return 'MessagesList Component Debug Output';
    }

    ngOnInit(): void {
        const subscription = this.messagesService.messages$.subscribe(
            (allMessages) => {
                this.messages = allMessages;
                this.cdRef.markForCheck();
            }
        );

        /* In case component is rendered conditionally - clean the subscription */
        this.destroyRef.onDestroy(() => {
            subscription.unsubscribe();
        });
    }
}
