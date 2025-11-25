const { Category } = require('../models');

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'El nombre de la categoría es requerido' });
    }

    const existing = await Category.findOne({ where: { name } });
    if (existing) {
      return res.status(409).json({ success: false, message: 'La categoría ya existe' });
    }

    const category = await Category.create({ name, description });
    res.status(201).json({ success: true, message: 'Categoría creada', data: category });
  } catch (err) {
    console.error('Error crear categoría:', err);
    res.status(500).json({ success: false, message: 'Error al crear categoría' });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json({ success: true, data: categories });
  } catch (err) {
    console.error('Error obtener categorías:', err);
    res.status(500).json({ success: false, message: 'Error al obtener categorías' });
  }
};
