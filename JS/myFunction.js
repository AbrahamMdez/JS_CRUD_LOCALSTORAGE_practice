const formUI = document.querySelector('#form');
const listActivityUI = document.querySelector('#activity-list');

let arrayActivity = [];

const createItem = activity => {

    let item = {
        activity: activity,
        status: false
    };

    arrayActivity.push(item);

    return item;
};

const saveDB = () => {
    localStorage.setItem('diaryExercise', JSON.stringify(arrayActivity));

    readDB();
};

const readDB = () => {
    listActivityUI.innerHTML = '';

    arrayActivity = JSON.parse(localStorage.getItem('diaryExercise'))
    
    if(arrayActivity === null) {
        arrayActivity = [];
    } else {
        arrayActivity.forEach( element => {
            listActivityUI.innerHTML += `
                <article class="alert alert-danger" role="alert">
                    <b>${element.activity}</b> - ${element.status}
                    <span class="float-right">
                        <i class="material-icons">
                            check
                        </i>
                        <i class="material-icons">
                            delete
                        </i>
                    </span>
                </article>`
        });
    }
};

const deleteDB = activity => {
    let indexArray;
    arrayActivity.forEach(( element, index ) => {

        if(element.activity === activity) {
            indexArray = index;
        }
    });

    arrayActivity.splice(indexArray, 1);
    saveDB();
};

const editDB = activity => {
    let indexArray = arrayActivity.findIndex(element => element.activity === activity);
    console.log(indexArray)
    console.log(arrayActivity[indexArray])
    
    arrayActivity[indexArray].status = true;
    saveDB();
};

formUI.addEventListener('submit', e => {

    e.preventDefault();
    let activity = document.querySelector('#activity').value;
    /* console.log(activity) */
    createItem(activity);

    saveDB();

    formUI.reset();
});

document.addEventListener('DOMContentLoaded', readDB);

listActivityUI.addEventListener('click', e => {
    e.preventDefault();

    if (e.target.innerHTML.trim() === 'check' || e.target.innerHTML.trim() === 'delete') {
        let text = e.path[2].childNodes[1].innerHTML;

        if (e.target.innerHTML.trim() === 'check') {
            editDB(text);
        }
    
        if (e.target.innerHTML.trim() === 'delete') {
            deleteDB(text);
        }
    } 
});