let resources = []; // stockage temporaire en mémoire
let nextId = 1;

const getAllResources = () => resources;

const getResourceById = (id) => resources.find(r => r.id === id);

const createResource = (data) => {
  const newResource = { id: nextId++, ...data };
  resources.push(newResource);
  return newResource;
};

const updateResource = (id, data) => {
  const index = resources.findIndex(r => r.id === id);
  if (index === -1) return null;
  resources[index] = { ...resources[index], ...data };
  return resources[index];
};

const deleteResource = (id) => {
  const index = resources.findIndex(r => r.id === id);
  if (index === -1) return false;
  resources.splice(index, 1);
  return true;
};

module.exports = {
  getAllResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource
};
