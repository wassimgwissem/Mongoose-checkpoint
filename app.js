const database = require('./database');
const Person = require('./models/Person');
const mongoose = require('mongoose');

// Initialize database connection
database();

// Main function with all operations
const runOperations = async () => {
  try {
    // Create and save a person
    const person = new Person({
      name: 'John Doe',
      age: 32,
      favoriteFoods: ['pizza', 'burger']
    });
    const savedPerson = await person.save();
    console.log('Person saved:', savedPerson);

    // Create many people
    const arrayOfPeople = [
      { name: 'Alice', age: 28, favoriteFoods: ['sushi'] },
      { name: 'Bob', age: 42, favoriteFoods: ['steak', 'wine'] },
      { name: 'Mary', age: 35, favoriteFoods: ['pasta', 'salad'] }
    ];
    const createdPeople = await Person.create(arrayOfPeople);
    console.log('People created:', createdPeople);

    // Find people by name
    const maryPeople = await Person.find({ name: 'Mary' });
    console.log('People named Mary:', maryPeople);

    // Find one person by food
    const pastaLover = await Person.findOne({ favoriteFoods: 'pasta' });
    console.log('Person who likes pasta:', pastaLover);

    // Find person by ID
    const personById = await Person.findById(savedPerson._id);
    console.log('Person found by ID:', personById);

    // Classic update
    personById.favoriteFoods.push('hamburger');
    const updatedPerson = await personById.save();
    console.log('Updated person:', updatedPerson);

    // Find and update
    const aliceUpdated = await Person.findOneAndUpdate(
      { name: 'Alice' },
      { age: 20 },
      { new: true }
    );
    console.log('Updated Alice:', aliceUpdated);

    // Remove by ID
    const removedPerson = await Person.findByIdAndDelete(aliceUpdated._id);
    console.log('Removed person:', removedPerson);

    // Remove many people
    const deleteResult = await Person.deleteMany({ name: 'Mary' });
    console.log('Delete result:', deleteResult);

    // Query chaining
    const queryResults = await Person.find({ favoriteFoods: 'burger' })
      .sort('name')
      .limit(2)
      .select('-age')
      .exec();
    console.log('Query results:', queryResults);

    // Close connection
    mongoose.connection.close();
    console.log('Connection closed');
  } catch (err) {
     console.error('Error:', err);
     process.exit(1);
  }
};

// Start the operations
runOperations();