import mongoose from 'mongoose';



const windPowerPlantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    wattage: {
        type: Number,
        required: true
    },
    machines: [{
        type: Schema.Types.ObjectId,
        ref: 'Machine'
    }],
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    engineers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    operators: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

export default model('WindPowerPlant', windPowerPlantSchema);