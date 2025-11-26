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

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
    res.json({ success: true, data: category });
  } catch (err) {
    console.error('Error obtener categoría:', err);
    res.status(500).json({ success: false, message: 'Error al obtener categoría' });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: 'Categoría no encontrada' });

    const { name, description } = req.body;
    if (name) category.name = name;
    if (description !== undefined) category.description = description;

    await category.save();
    res.json({ success: true, message: 'Categoría actualizada', data: category });
  } catch (err) {
    console.error('Error actualizar categoría:', err);
    res.status(500).json({ success: false, message: 'Error al actualizar categoría' });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: 'Categoría no encontrada' });

    await category.destroy();
    res.json({ success: true, message: 'Categoría eliminada' });
  } catch (err) {
    console.error('Error eliminar categoría:', err);
    res.status(500).json({ success: false, message: 'Error al eliminar categoría' });
  }
};
