const { DataTypes, Model, Op } = require('sequelize');
const { sequelize } = require('../../loaders/database');

let club_locations = undefined;

class ClubLocation extends Model {
    static async findAllClubLocation() {
        if(club_locations == undefined) {
            club_locations = await ClubLocation.findAll();
        }
        return club_locations;
    }
    static async findAllByLikeName(name) {
        const club_locations = await ClubLocation.findAllClubLocation();

        const finded_club_locations = club_locations.filter( (cl) => {
            if(cl.short_name.indexOf(name) != -1) {
                return true;
            }
        });

        if(!finded_club_locations) {
            finded_club_locations = await ClubLocation.findAll({ where: { 
                short_name: { [Op.like]: name }
            }});
            club_locations.contact(finded_club_locations);
        }

        return finded_club_locations;
    }
}

ClubLocation.init({
    floor: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    priority: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    short_name: {
        type: DataTypes.STRING(8),
        allowNull: true,
        field: 'name',
    }
},
    {
        sequelize,
        tableName: 'class'
    });

module.exports = ClubLocation;
