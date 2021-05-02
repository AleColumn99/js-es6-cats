/*

Milestone 1
Definire un array di oggetti; ogni oggetto rappresenta un gatto, che è caratterizzato da: nome, età, colore e sesso.
Tramite la funzione .forEach(), stampare in pagina tutti i gattini, ciascuno con il proprio colore e il proprio nome.

Milestone 2
Dividere i gatti in due contenitori distinti in base al sesso e aggiungere a fianco di ogni gattino un fiocco colorato di rosa, se femmina, o di blu, se maschio. Il colore del fiocco deve essere più tenue se il gatto è più giovane, più scuro se il gatto è più vecchio.

Milestone 3
Creare un nuovo array con prima tutti i gattini femmina e poi tutti i gattini maschio, inserendo solamente nome e colore e colore e opacità del fiocco per ogni gatto.

*/



$(document).ready(function() {

  //base dati
  const cats = [
    {
      name: 'Balzo',
      age: 5,
      color: '#AA4422',
      gender: 'male'
    },
    {
      name: 'Minù',
      age: 0.5,
      color: '#DBA178',
      gender: 'female'
    },
    {
      name: 'Leo',
      age: 8,
      color: '#1E110A',
      gender: 'male'
    },
    {
      name: 'Ipazia',
      age: 3,
      color: '#6E4B35',
      gender: 'female'
    },
    {
      name: 'Pepe',
      age: 1.5,
      color: '#000104',
      gender: 'male'
    }
  ];



  //milestone 1
  //stampo i gatti con un forEach
  cats.forEach((cat) => {
    $('#cat-list-1 ul').append(listGenerator(cat.color, cat.name))
  });



  //milestone 2
  //aggiungo alla mia base dati le proprietà del ribbon
  const pink = '#FF06E6';
  const blue = '#0084FF';
  const newCats = cats.map((cat) => {
    //creo le proprietà da aggiungere per il ribbon
    //per questa condizione usiamo l'operatore ternario
    let color = (cat.gender === 'female') ? pink : blue;
    let opacity = cat.age / 10;
    return {
      ...cat,
      ribbon: {
        color,
        opacity
      }
    }
  });

  const femaleCats = newCats.filter((cat) => cat.gender === 'female');
  const maleCats = newCats.filter((cat) => cat.gender === 'male');

  femaleCats.forEach((cat) => {
    $('#cat-list-2 ul').append(listGenerator(cat.color, cat.name, cat.ribbon.color, cat.ribbon.opacity));
  });
  maleCats.forEach((cat) => {
    $('#cat-list-3 ul').append(listGenerator(cat.color, cat.name, cat.ribbon.color, cat.ribbon.opacity));
  });



  //milestone 3
  //unire in ordine prima femmine e poi maschi in un array
  const orderCats = [...femaleCats, ...maleCats];

  //generare un array con solo nome, colore e ribbon e stamparlo
  const catsTarget = orderCats.map ((cat) => {
    const {name, color, ribbon} = cat;
    $('#cat-list-4 ul').append(listGenerator(color, name, ribbon.color, ribbon.opacity));
    return {name, color, ribbon};
  });

});

function listGenerator (catColor, name, ...ribbon) {
  let ribbonTag = '';
  if (ribbon.length > 0) {
    ribbonTag = 
    `<i 
    class="fas fa-ribbon" 
    style="color:${ribbon[0]}; opacity:${ribbon[1]}"
    ></i>`
  }
  let html = 
  `<li>
  <i class="fas fa-cat" style="color: ${catColor}"></i>
  ${ribbonTag}
  <span>${name}</span>
  </li>`;
  return html;
}