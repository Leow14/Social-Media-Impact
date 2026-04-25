

function List(){

    const fruits = [{id: 1, name:"lime",       calories: 95},
                    {id: 2, name:"blueberry",  calories: 105},
                    {id: 3, name:"peach",      calories: 36},
                    {id: 4, name:"pineapple",  calories: 37}, 
                    {id: 5, name:"kiwi",       calories: 50}];

    fruits.sort((a, b) => a.name.localeCompare(b.name));    // Alphabetical
    fruits.sort((a, b) => b.name.localeCompare(a.name));    // Reverse
    fruits.sort((a, b) => a.calories - b.calories);         // Numeric
    fruits.sort((a, b) => b.calories - a.calories);         // Reverse Numeric
    
    const lowCalFruits = fruits.filter(fruit => fruit.calories < 100)
    const highCalFruits = fruits.filter(fruit => fruit.calories > 100)


    const ItemsList = highCalFruits.map     (highCalFruit => <li key={highCalFruit.id}>
                                            {highCalFruit.name}: &nbsp;
                                            <b>{highCalFruit.calories}</b></li>);

    return (<ol>{ItemsList}</ol>);
}
export default List