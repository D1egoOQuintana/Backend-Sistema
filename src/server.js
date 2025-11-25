const app = require('./app');
require('dotenv').config();

// Load models and associations
const { sequelize, Role } = require('./models');

const PORT = process.env.PORT || 3001;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida');

        // Synchronize models first (creates tables) then seed default data
        await sequelize.sync({ alter: true });
        console.log('Modelos sincronizados');

        // Ensure default roles exist (seed after sync)
        try {
            const defaultRoles = ['admin', 'user'];
            for (const r of defaultRoles) {
                await Role.findOrCreate({ where: { name: r } });
            }
            console.log('Roles por defecto presentes');
        } catch (seedErr) {
            console.error('Error al seedear roles:', seedErr);
            // don't exit - app can still run; decide whether to exit in production
        }

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1);
    }
};

startServer();
