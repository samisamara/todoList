const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
// by adding '.search' we grab the element with the class name, and 'input' allows us to grab the content inside
const search = document.querySelector('.search input');

// here we create 
const generateTemplate = todo => {
    const html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <span>${todo}</span>
          <i class="far fa-trash-alt delete"></i>
        </li>
    `;

    list.innerHTML += html;

}

addForm.addEventListener('submit', e => {
    e.preventDefault();
    // .trim() removes any spaces before or after a line of text
    const todo = addForm.add.value.trim();
    if (todo.length) {
        generateTemplate(todo);
        // this resets the textbox everytime we submit a new todo so the text disappears
        addForm.reset();
    };
});

// delete todos
list.addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
    }
});

// 
const filterTodos = term => {
    // Array.from() creates an array out of existing data
    // in this example, it is all children of the list attribute
    // .textContent will always look at the actual text within the tag, even if the text comes from the child tag
    // includes searches a string to see if it includes a certain term, in this case, the content of 'term'
    // the ! is there to do the opposite, just like in java, so this code return nonmatches
    Array.from(list.children)
        .filter((todo) => !todo.textContent.toLowerCase().includes(term))
        .forEach((todo) => todo.classList.add('filtered'));

    // this part of the code removes the 'filtered' class from the array to take into account deleted characters
    Array.from(list.children)
        .filter((todo) => todo.textContent.toLowerCase().includes(term))
        .forEach((todo) => todo.classList.remove('filtered'));
    
};

// keyup
search.addEventListener('keyup', () => {
    // this line grabs the term inside search everytime the user types something new
    // .trim() is necessary to add so we can remove any unnecessary spaces from the inputted text
    const term = search.value.trim().toLowerCase();
    filterTodos(term);
});