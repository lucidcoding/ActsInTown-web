import { async, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { ListSpotsComponent } from '../../../components/spot/list/listSpotsComponent';
import { SpotService } from '../../../services/spot/spot.service';

export function main() {
    var mockSpotService: any;

    describe('For listSpotsComponent', () => {
        beforeEach(() => {
            let spots = [
                {
                    id: 'SPOT_001',
                    scheduledFor: new Date(2010, 10, 4, 20, 10, 0),
                    durationMinutes: 10,
                    town: {
                        name: 'TOWN_001'
                    },
                    venueName: 'Venue 01'
                },
                {
                    id: 'SPOT_002',
                    scheduledFor: new Date(2010, 10, 5, 21, 0, 0),
                    durationMinutes: 20,
                    town: {
                        name: 'TOWN_002'
                    },
                    venueName: 'Venue 02'
                }
            ];

            mockSpotService = {
                getForCurrentUser: jasmine.createSpy('getForCurrentUser').and.returnValue(Observable.from([spots]))
            };

            TestBed.configureTestingModule({
                imports: [],
                declarations: [ListSpotsComponent],
                providers: [
                    { provide: SpotService, useValue: mockSpotService }
                ]
            });
        });

        describe('Calling ngOnInit()', () => {
            it('should set list of spots.', async(() => {
                TestBed
                    .compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(ListSpotsComponent);
                        fixture.detectChanges();
                        let component = fixture.debugElement.componentInstance;
                        expect(mockSpotService.getForCurrentUser).toHaveBeenCalled();
                        expect(component.viewModel.spots.length).toEqual(2);
                        expect(component.viewModel.spots[0].id).toEqual('SPOT_001');
                        expect(component.viewModel.spots[0].scheduledFor).toEqual(new Date(2010, 10, 4, 20, 10, 0));
                        expect(component.viewModel.spots[0].durationMinutes).toEqual(10);
                        expect(component.viewModel.spots[0].townName).toEqual('TOWN_001');
                        expect(component.viewModel.spots[0].venueName).toEqual('Venue 01');
                        expect(component.viewModel.spots[1].id).toEqual('SPOT_002');
                        expect(component.viewModel.spots[1].scheduledFor).toEqual(new Date(2010, 10, 5, 21, 0, 0));
                        expect(component.viewModel.spots[1].durationMinutes).toEqual(20);
                        expect(component.viewModel.spots[1].townName).toEqual('TOWN_002');
                        expect(component.viewModel.spots[1].venueName).toEqual('Venue 02');
                    });
            }));
        });
    });
}
