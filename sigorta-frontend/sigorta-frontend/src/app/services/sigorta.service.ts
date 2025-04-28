import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SigortaService {

  constructor(private http: HttpClient) { }

  submitApplication(formData: any): Observable<any> {
    // Backend çalışıyorsa:
    // return this.http.post('http://localhost:8080/sigorta-basvuru', formData);

    // Backend hazır değilse (fake cevap verelim):
    return of({ sonuc: this.fakeEvaluate(formData) });
  }

  // Bu sadece test için: cevapları uyduruyoruz
  private fakeEvaluate(formData: any): string {
    const { yas, saglik, sigara, alkol } = formData;

    if (yas === '15-17' || yas === '60+' || saglik === 'Kötü' || sigara === 'Evet' || alkol === 'Evet') {
      return 'Üzgünüz, sigorta başvurunuz reddedildi.';
    }
    return 'Tebrikler! Sigorta başvurunuz onaylandı.';
  }
}
