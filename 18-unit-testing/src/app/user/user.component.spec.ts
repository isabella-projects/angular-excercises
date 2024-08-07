import {
    ComponentFixture,
    TestBed,
    waitForAsync,
    fakeAsync,
    tick,
} from '@angular/core/testing';

import { UserComponent } from './user.component';

import { UserService } from './user.service';
import { DataService } from '../shared/data.service';

describe('UserComponent', () => {
    let component: UserComponent;
    let fixture: ComponentFixture<UserComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UserComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(UserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app', () => {
        let fixture = TestBed.createComponent(UserComponent);
        let app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should use the user name from the service', () => {
        let fixture = TestBed.createComponent(UserComponent);
        let app = fixture.debugElement.componentInstance;
        let userService = fixture.debugElement.injector.get(UserService);
        fixture.detectChanges();
        expect(userService.user.name).toEqual(app.user.name);
    });

    it("shouldn't display the user name if user is not logged in", () => {
        let fixture = TestBed.createComponent(UserComponent);
        let app = fixture.debugElement.componentInstance;
        fixture.detectChanges();

        let compiled = fixture.debugElement.nativeElement as HTMLElement;
        expect(compiled.querySelector('span')?.textContent).not.toEqual(
            app.user.name,
        );
    });

    it("shouldn't fetch data successfully if not called asynchronously", () => {
        let fixture = TestBed.createComponent(UserComponent);
        let app = fixture.debugElement.componentInstance;

        let dataService = fixture.debugElement.injector.get(DataService);
        let spy = spyOn(dataService, 'getDetails');
        spy.and.returnValue(Promise.resolve('Data'));
        fixture.detectChanges();
        expect(app.data).toBe(undefined);
    });

    it('should fetch data successfully if called asynchronously', waitForAsync(() => {
        let fixture = TestBed.createComponent(UserComponent);
        let app = fixture.debugElement.componentInstance;

        let dataService = fixture.debugElement.injector.get(DataService);
        let spy = spyOn(dataService, 'getDetails');
        spy.and.returnValue(Promise.resolve('Data'));

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(app.data).toBe('Data');
        });
    }));

    it('should fetch data successfully if called asynchronously', fakeAsync(() => {
        let fixture = TestBed.createComponent(UserComponent);
        let app = fixture.debugElement.componentInstance;

        let dataService = fixture.debugElement.injector.get(DataService);
        let spy = spyOn(dataService, 'getDetails');
        spy.and.returnValue(Promise.resolve('Data'));

        fixture.detectChanges();
        tick();
        expect(app.data).toBe('Data');
    }));
});
