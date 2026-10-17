const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
  menuButton.textContent = open ? 'Close ✕' : 'Menu ☰';
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); menuButton?.setAttribute('aria-expanded', 'false');
  if (menuButton) menuButton.textContent = 'Menu ☰';
}));
const quizItems = [
  {q:'What is one important effect beaver dams can have?',a:['They turn freshwater into saltwater','They can create ponds and wetlands','They stop all plants from growing'],correct:1,why:'Correct! Dams can slow water and help create wetland habitats.'},
  {q:'What do beavers mainly eat?',a:['Plants, bark and leaves','Fish and frogs','Only insects'],correct:0,why:'That is right! Beavers are herbivores and eat a range of vegetation.'},
  {q:'Which feature helps beavers swim?',a:['Feathered wings','Webbed hind feet','A fin on their back'],correct:1,why:'Exactly! Their large webbed hind feet help them paddle through water.'},
  {q:'How many living beaver species are there?',a:['One','Two','Seven'],correct:1,why:'Yes! There are two living species: North American and Eurasian beavers.'}
];
let current = 0;
function renderQuiz(){
  const item = quizItems[current]; document.querySelector('#question').textContent = item.q;
  const box = document.querySelector('#answers'); box.replaceChildren();
  item.a.forEach((answer, index) => { const button = document.createElement('button'); button.textContent = answer; button.addEventListener('click', () => {
    [...box.children].forEach((b,i) => { b.disabled = true; if(i === item.correct) b.classList.add('correct'); });
    if(index !== item.correct) button.classList.add('incorrect');
    document.querySelector('#quiz-feedback').textContent = index === item.correct ? item.why : `Not quite. ${item.why}`;
  }); box.append(button); });
  document.querySelector('#quiz-feedback').textContent = '';
}
document.querySelector('#next-question').addEventListener('click', () => { current = (current + 1) % quizItems.length; renderQuiz(); });
renderQuiz();
