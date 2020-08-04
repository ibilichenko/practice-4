export default function showDialog(dialogEl) {
  $(dialogEl).modal('show');

  return new Promise((resolve, reject) => {
    const yesBtn = dialogEl.querySelector('.yes');
    const noBtn = dialogEl.querySelector('.no');
    yesBtn.addEventListener('click', () => resolve());
    noBtn.addEventListener('click', () => reject());
  });
}
