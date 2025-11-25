const app = require('./app');
require('dotenv').config();

// Load models and associations
const { sequelize, Role } = require('./models');

const PORT = process.env.PORT || 3001;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida');

        // Ensure default roles exist
        const defaultRoles = ['admin', 'user'];
        for (const r of defaultRoles) {
            await Role.findOrCreate({ where: { name: r } });
        }

        await sequelize.sync({ alter: true });
        console.log('Modelos sincronizados');

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1);
    }
};

startServer();
