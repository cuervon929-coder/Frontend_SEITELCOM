import { TestBed } from '@angular/core/testing';
import { HistorialPagos } from './historial-pagos';

describe('HistorialPagos', () => {
  let service: HistorialPagos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorialPagos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
