const formContent = document.querySelector('.form__content');
const formName = document.querySelector('.form__name');
const formAmount = document.querySelector('.form__amount');
const formBatch = document.querySelector('.form__batch');
const formDate = document.querySelector('.form__date');
const formSN= document.querySelector('.form__SN');


const checkContent = document.querySelector('.check__content');
const checkName = document.querySelector('.check__name');
const checkAmount = document.querySelector('.check__amount');
const checkBatch = document.querySelector('.check__batch');
const checkDate = document.querySelector('.check__date');
const checkSN = document.querySelector('.check__SN')


const EditBtn = document.querySelector('.check__button.Edit');
const SubmitBtn = document.querySelector('.check__button.Submit');

const voucher= document.querySelector('.voucher');
const voucherName = document.querySelector('.voucher__name');
const voucherAmount = document.querySelector('.voucher__amount');
const voucherSN = document.querySelector('.voucher__SN');
const voucherDate = document.querySelector('.voucher__date');

const modal = document.querySelector('.modal');
const modalImg = document.querySelector('.modal__img');
const download = document.querySelector('.modal__btn');

const scriptURL = 'https://script.google.com/macros/s/AKfycbzoHLWIJUf8uOjLdcH5_S1i2iUR8vQ8gEl1t4FV1sMtFKQFnhsQQR5YOgpjUCE-V9UI/exec';
const form = document.forms['submitted-form'];

let Name, Amount, Batch, date, SerialNumber, Remark = '';
let voucherCanvas;

function displayCheck(e){
  e.preventDefault();
  formContent.style.display = 'none';
  checkContent.style.display = 'block';

  Name = formName.value;
  Amount = formAmount.value;
  Batch = formBatch.value;
  date = formDate.value;
  SerialNumber = formSN.value;
  
  checkName.innerHTML = Name;
  checkAmount.innerHTML = Amount + ' Ks';
  checkBatch.innerHTML = Batch;
  checkDate.innerHTML = date;
  checkSN.innerHTML = SerialNumber;

}

function displayForm(e){
  e.preventDefault();
  checkContent.style.display = 'none';
  formContent.style.display = 'block';  
}

function screenshot() {
  
  html2canvas(document.querySelector('.voucher')).then(function(canvas) {
      canvas.className = 'modal_canvas';
      canvas.removeAttribute('style');
      modalImg.appendChild(canvas)

      modal.style.display = 'block';
      voucherCanvas = canvas;
  });
}


function displayVoucher(e){
  e.preventDefault();

  // console.log(form);
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {
        console.log('Success!', response)
        document.querySelector('.modal__success').style.display = 'block';
        window.setTimeout(() => {
          document.querySelector('.modal__success').style.display = 'none'; 
        }, 3000);
      })
      .catch(error => {
        console.error('Error!', error.message);
        document.querySelector('.modal__error').style.display = 'block';
        window.setTimeout(() => {
          document.querySelector('.modal__error').style.display = 'none'; 
        }, 3000);
      });

      
  checkContent.style.display = 'none';
  voucher.style.display = 'block';
  voucherName.innerHTML = Name;
  voucherAmount.innerHTML = Amount;
  voucherDate.innerHTML = date;
  voucherSN.innerHTML = SerialNumber;
  voucherCanvas = screenshot();
  voucher.style.display = 'none';
  // document.querySelector('.footer').style.display = 'none';
  document.querySelector('.l-form').style.display = 'none';
  formName.value = '';
  formAmount.value = '';
  formBatch.value = '';
  formDate.value = '';
  formSN.value = '';

}

function downloadImg(e){
  e.preventDefault();
  console.log('aaa')
  const link = document.createElement('a');
  link.download = 'download.jpg';
  link.href = voucherCanvas.toDataURL();
  link.click();
  link.delete;
  

  modal.style.display = 'none';
  modalImg.innerHTML = '';
  formContent.style.display = 'block';
  document.querySelector('.footer').style.display = 'block';
  document.querySelector('.l-form').style.display = 'block';
}

formContent.addEventListener('submit', displayCheck);

EditBtn.addEventListener('click', displayForm);

SubmitBtn.addEventListener('click', displayVoucher)

download.addEventListener('click', downloadImg)

