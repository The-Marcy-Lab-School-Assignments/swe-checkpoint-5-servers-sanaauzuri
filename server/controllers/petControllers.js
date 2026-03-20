// TODO: Import the Pet model
const petModel = require('../models/petModel');

// TODO: Implement each controller function.
// Each controller should:
//   - Parse any needed data from req.params or req.body
//   - Call the appropriate Pet model method
//   - Send the appropriate response with the correct status code

module.exports.createPet = (req, res) => {
  // Parse the name from req.body
  const { name } = req.body;
  // If name is missing, send a 400 response with an error message
  if (!name) {
    return res.status(400).send({ message: 'Name is missing' });
  }
  // Otherwise, create the pet and send a 201 response
  const newPet = petModel.create(name);
  res.status(201).send(newPet);
};

module.exports.listPets = (req, res) => {
  // Get all pets and send them
  const petsList = petModel.list();
  res.send(petsList);
};

module.exports.getPet = (req, res) => {
  // Parse the id from req.params (remember to convert to a Number!)
  const { id } = req.params;
  const pet = petModel.find(Number(id));
  // If the pet is not found, send a 404 response with an error message
  if (!pet) {
    return res.status(404).send({ message: `No pet with the id ${id}` });
  }
  // Otherwise, send the pet
  res.send(pet);
};

module.exports.updatePet = (req, res) => {
  // Parse the id from req.params and the name from req.body
  const { id } = req.params;
  const { name } = req.body;
  
  // If name is missing, send a 400 response
  if (!name) {
    return res.status(400).send({ message: 'Name is missing' });
  };
  const updatedPet = petModel.update(Number(id), { name });
  // If the pet is not found, send a 404 response
  if (!updatedPet) {
    return res.status(404).send({ message: `No pet with the id ${id}` });
  };
  // Otherwise, send the updated pet
  res.send(updatedPet);
};

module.exports.deletePet = (req, res) => {
  // Parse the id from req.params
  const { id } = req.params
  const deletedPet = petModel.destroy(Number(id));
  // If the pet is not found, send a 404 response
  if (!deletedPet) {
    return res.status(404).send({ message: `No pet with the id ${id}` });
  };
  // Otherwise, send the deleted pet
  res.send(deletedPet)
};
