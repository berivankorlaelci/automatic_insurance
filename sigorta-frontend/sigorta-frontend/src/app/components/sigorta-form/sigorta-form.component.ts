import { Component } from '@angular/core';
import {SigortaService} from '../../services/sigorta.service';

@Component({
  selector: 'app-sigorta-form',
  standalone: false,
  templateUrl: './sigorta-form.component.html',
  styleUrl: './sigorta-form.component.css'
})



export class SigortaFormComponent {
  questions = [
    { text: 'Yaşınızı seçin', options: ['15-17', '18-25', '26-40', '41-60', '60+'], field: 'yas' },
    { text: 'Sağlık durumunuz?', options: ['Çok İyi', 'İyi', 'Orta', 'Kötü'], field: 'saglik' },
    { text: 'Mesleğiniz?', options: ['Mühendis', 'Pilot', 'Şoför', 'Öğrenci', 'Diğer'], field: 'meslek' },
    { text: 'Gelir durumunuz?', options: ['0-5000', '5000-10000', '10000-20000', '20000+'], field: 'gelir' },
    { text: 'Sigara kullanıyor musunuz?', options: ['Evet', 'Hayır'], field: 'sigara' },
    { text: 'Alkol kullanıyor musunuz?', options: ['Evet', 'Hayır'], field: 'alkol' },
    { text: 'Geçmiş sigorta kayıtlarınız?', options: ['Temiz', 'Problemli'], field: 'gecmis' },
    { text: 'Medeni durumunuz?', options: ['Evli', 'Bekar'], field: 'medeni' },
    { text: 'Mal varlığınız?', options: ['Ev var', 'Araba var', 'İkisi de var', 'Hiçbiri'], field: 'malvarligi' }
  ];
  userInfo = {
    name: '',
    surname: '',
    tc: ''
  };

  currentQuestionIndex = 0;
  answers: any = {};
  formSubmitted = false;
  sigortaSonucu: string = '';
  showQuestions = false;

  constructor(private sigortaService: SigortaService) { }


  startQuiz() {
    if (this.userInfo.name && this.userInfo.surname && this.userInfo.tc) {
      this.showQuestions = true;
    } else {
      alert("Lütfen tüm bilgileri eksiksiz girin.");
    }
  }

  nextQuestion(selectedOption: string) {
    const currentField = this.questions[this.currentQuestionIndex].field;
    this.answers[currentField] = selectedOption;
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex === this.questions.length) {
      this.submitForm();
    }
  }

  submitForm() {
    const formData = {
      ...this.answers,
      name: this.userInfo.name,
      surname: this.userInfo.surname,
      tc: this.userInfo.tc
    };

    this.sigortaService.submitApplication(formData).subscribe({
      next: (response) => {
        this.sigortaSonucu = response.sonuc;
        this.formSubmitted = true;
      },
      error: (error) => {
        console.error('Form gönderilirken hata oluştu', error);
      }
    });
  }


  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  resetForm() {
    this.currentQuestionIndex = 0;
    this.answers = {};
    this.formSubmitted = false;
    this.sigortaSonucu = '';
  }
  isSelected(option: string): boolean {
    const currentField = this.questions[this.currentQuestionIndex].field;
    return this.answers[currentField] === option;
  }

  startNewUser() {
    // kullanıcı bilgilerini sıfırlıyoruz
    this.userInfo = { name: '', surname: '', tc: '' };
    this.showQuestions = false; // Sorular kısmını gizle
    this.currentQuestionIndex = 0; // Sorular sırasını sıfırlıyoruz

    this.formSubmitted = false; // Sonuçları gizle
    this.sigortaSonucu = ''; // Sonuçları temizle
    this.resetForm();

  }
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }


}
