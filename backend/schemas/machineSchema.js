import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Schema for Solar Machines
const solarMachineSchema = new Schema({
    Timestamp: Date,
    Temperature_C: Number,
    IR_Hotspot_Temperature_C: Number,
    Current_A: Number,
    Voltage_V: Number,
    IV_Curve_Efficiency_Percent: Number,
    Solar_Irradiance_Wm2: Number,
    Wind_Speed_mps: Number,
    Humidity_Percent: Number,
    Dust_Level_gm2: Number,
    Power_Output_kW: Number,
    Harmonic_Distortion_Percent: Number,
    Ground_Fault_Current_mA: Number,
    Cooling_Fan_Speed_RPM: Number,
    Vibration_mms: Number,
    Tilt_Angle_deg: Number,
    System_Health_Score_Percent: Number
});

// Schema for Wind Machines
const windMachineSchema = new Schema({
    Timestamp: Date,
    Temperature_C: Number,
    IR_Hotspot_Temperature_C: Number,
    Current_A: Number,
    Voltage_V: Number,
    IV_Curve_Efficiency_Percent: Number,
    Solar_Irradiance_Wm2: Number,
    Wind_Speed_mps: Number,
    Humidity_Percent: Number,
    Dust_Level_gm2: Number,
    Power_Output_kW: Number,
    Harmonic_Distortion_Percent: Number,
    Ground_Fault_Current_mA: Number,
    Cooling_Fan_Speed_RPM: Number,
    Vibration_mms: Number,
    Tilt_Angle_deg: Number,
    System_Health_Score_Percent: Number
});

// Schema for Hydro Machines
const hydroMachineSchema = new Schema({
    Vibration_m_s2: Number,
    Temperature_C: Number,
    Pressure_bar: Number,
    Flow_Rate_m3_s: Number,
    Water_Level_m: Number,
    Torque_Nm: Number,
    Current_A: Number,
    Voltage_V: Number,
    Position_Accuracy_degrees: Number,
    Acoustic_dB: Number,
    System_Health_Score_Percent: Number
});

export const SolarMachine = model('SolarMachine', solarMachineSchema);
export const WindMachine = model('WindMachine', windMachineSchema);
export const HydroMachine = model('HydroMachine', hydroMachineSchema);