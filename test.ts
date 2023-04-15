// TODO
/// control.ramSize


// * 23-0414-0920
let _local_graph_number__x_axis_invert_offset__int = 0
let _local_graph_number__leds_counter_index__iteration_step__int = 0
let _local_graph_number__leds_counter_index__base0__int = 0
let _local_graph_number__leds_needed__base1__int = 0
let mode_State_Run_TimeSystem_Countdown_Max_Sec_Int = 0
let mode_State_Run_TimeSystem_Countdown_Now_Sec_Int = 0
let mode_State_Run_TimeSystem_Start_Sec_Int = 0
let sensor_Compass_Direction__Detect_Delta__DegreesToPower__K_Total_Fix__Int = 0
let sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_MagicConvert__Int = 0
let sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_MagicConvert__Int = 0
let sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_MagicConvert__Int = 0
let motor_Direction_Right_Str = ""
let motor_Direction_Left_Str = ""
let graph_Number__Leds_Counter_SensitvityZoomin_MULTIPLIER_INT = 0
let graph_Number__Leds_Counter_MAX__BASE1__INT = 0
let mode_Force_Straight_Pdi_Magnetometer_Bool = false
let sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_Fix__Int = 0
let sensor_Compass_Direction__Detect_Delta_Summation_Now__Int = 0
let sensor_Compass_Direction__Detect_Delta_Summation_Old__Int = 0
let sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_Fix__Int = 0
let sensor_Compass_Direction__Detect_Delta_Change__Int = 0
let sensor_Compass_Direction__Detect_Delta_Old__Degrees__Int = 0
let sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_Fix__Int = 0
let sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int = 0
let sensor_Compass_Direction__Detect_TargetWindow_Degrees_Int = 0
let sensor_Compass_Direction__Detect_Target_TurningOffset__Degrees__Int = 0
let sensor_Compass_Direction__Detect_Target__Degrees__Int = 0
let sensor_Compass_Direction__Bot_Now__Degrees__Int = 0
let _system_StringVariable_AsComment = ""
let motor_Power_Right_Int = 0
let motor_Power_Left_Int = 0
let motor_PowerAdjust_Stage2_PdiBaseMotion_AsOffset_ForStraights_Int = 0
let motor_PowerAdjust_Stage1_AvoidIdleDeadzone_AsOffset_ForTurnsAndStraights_Int = 0
let motor_Power_STOP_INT = 0
let cpu_Throttle_DELAY_MSEC_INT = 0


//
// Teal #008080 rgb(0, 128, 128)
// Green #008000 rgb(0, 128, 0)
//
/**
 * q_Autonomous blocks
 */
//% weight=41 color=#008000 icon="Q"
namespace q_Autonomous {


    /**
    * rq_Set_PID_Settings_Fn
    * @param k_p_in number
    * @param k_d_in number
    * @param k_i_in number
    * @param motor_poweradjust_stage1_avoididledeadzone_asoffset_forturnsandstraights_int number
    * @param motor_poweradjust_stage2_pdibasemotion_asoffset_forstraights_int number
    *
    */
    //% block="set pid settings(required in 'on start' stack):|* k_p_in[0.1 +/-0.05]: $k_p_in|* k_d_in[0.1 +/-0.05]: $k_d_in|* k_i_in[0.01 +/-0.005]: $k_i_in|* motor_poweradjust_stage1_avoididledeadzone_asoffset_forturnsandstraights_int[12]: $motor_poweradjust_stage1_avoididledeadzone_asoffset_forturnsandstraights_int|*motor_poweradjust_stage2_pdibasemotion_asoffset_forstraights_int[20]: $motor_poweradjust_stage2_pdibasemotion_asoffset_forstraights_int"
    //% weight=100 blockGap=8
    //% inlineInputMode=external
    export function rq_Set_PID_Settings_Fn(k_p_in: number = 0.1, k_d_in: number = 0.1, k_i_in: number = 0.01, motor_poweradjust_stage1_avoididledeadzone_asoffset_forturnsandstraights_int: number = 12, motor_poweradjust_stage2_pdibasemotion_asoffset_forstraights_int: number = 20): void {


        if (true) {
            basic.showIcon(IconNames.Happy)
        }
        // OLED: https://github.com/makecode-extensions/OLED12864_I2C
        if (true) {
            q_Dashboard.rq_Show_String_For_Oled_SmallFont_Fn(
                "RQ_PID: +CW -CCW",
                0,
                0
            )
            q_Timer.rq_Set_ContinueCurrentState_CountdownTimer_Fn(2, rq_Time_Units_Enum.Seconds)
            q_Dashboard.rq_Show_Oled_Cleared_Fn()
        }
        if (true) {
            // * Was 500ms 2fps, but decrease for more real-time gyroscope processing, try 100ms for 10fps, real-time, 50ms for 20fps, vs. debugging 1sec 1fps or 500ms :),  >> 100ms Ki overpowering?
            // * 100ms 10fps to 50ms 20fps :)+ min fps for decent real-time Kp response, but not too fast so humanly can keep-up
            // * For StopOnNonReflectLline, 50ms too long for motor duration, need faster response, so 25ms = 40fps
            // 
            // 22-1203-1800
            // * Since 'micro:bit' ver2, should process faster, even with OLED cpu-graphics-overhead, so 25ms to 0msec
            cpu_Throttle_DELAY_MSEC_INT = 0
            if (true) {
                // 360-Servo
                // * For StopPerpendicularToNonReflectLine
                // ** Min 150, Max 210, Stop 180: Too Slow?
                // ** Min 120, Max 240, Stop 180 Too Fast
                // ** 135, 225, 180
                // ** 150, 210, 180 delta 30
                // ** 135, 225, 180 delta 45
                // ** 140, 220, 180 delta 40
                // 
                // * Convert from 360_degrees servo to 180_degrees servo
                // 
                // * Geek-Green-Servo: was 0, 90, 180, yet too fast, try 45, 90, 135, better but still kindof fast,
                // * so try 60, 90, 120, PowerOffsetFromIdle=15, KpFwd=0.01,KpRev=0.02
                // ** try faster 45,90,135, as high as KpFwd=0.05, KpRev=0.10 as low as 0.01, 0.02 (x2)
                if (true) {
                    motor_Power_STOP_INT = 0
                    // * Geek-Green Servo try 60 since 360-Servo, too fast, so try 30
                    // * Geek-Green Servo, convert from 360_servo to 180_servo, so 60 too fast, so try 30
                    // 
                    // * Geek-Green Servo: from 0 to 10 farily dead, then 15 good starts, and 20 seemingly strong start, try 15 for bare minimum for both servos
                    // 
                    // * 15 to 20 for 90_degrees test
                    // 
                    // * from 15 to 10?, NOT ENOUGH POWER, WILL STALL, THUS 15
                    // ** Forward (14), 15
                    // ** Reverse (16), 17
                    // ***  Min Universal = 17
                    // **** Actually for turning-only, not straight, then 0 is best since will stop at right angle somewhat
                    // 
                    // 22-1007-1320
                    // * try 20 to be convervative on both sides, 0.1 0.1 0.01
                    motor_PowerAdjust_Stage1_AvoidIdleDeadzone_AsOffset_ForTurnsAndStraights_Int = 0
                    // * Min Value Possible for Slowest Motion for Most Accuracy: 1
                    motor_PowerAdjust_Stage2_PdiBaseMotion_AsOffset_ForStraights_Int = 0
                }
                if (true) {
                    q_Hardware.set_Settings_Fn(
                        true,
                        false
                    )
                    motor_Power_Left_Int = motor_Power_STOP_INT
                    motor_Power_Right_Int = motor_Power_STOP_INT
                    q_Hardware.rq_Set_PowerMotorsViaBlueRedBlackPins_Fn(
                        rq_PortGroup_BlueRedBlack_PortIds_Enum.S1_MotorLeft__S0_MotorRight,
                        motor_Power_STOP_INT,
                        motor_Power_STOP_INT
                    )
                }
            }
            if (true) {
                _system_StringVariable_AsComment = "PDI"
                if (true) {
                    _system_StringVariable_AsComment = "General"
                    sensor_Compass_Direction__Bot_Now__Degrees__Int = 0
                    sensor_Compass_Direction__Detect_Target__Degrees__Int = 0
                    // * for 90_degrees turn: tried 90 yet too small, so try 95 :)+, too much, try 90
                    // * for 180_degrees turn: try 180
                    sensor_Compass_Direction__Detect_Target_TurningOffset__Degrees__Int = 0
                    // was 5, 10, 0
                    sensor_Compass_Direction__Detect_TargetWindow_Degrees_Int = 0
                }
                if (true) {
                    _system_StringVariable_AsComment = "P"
                    sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int = 0
                    // * Blue FiTech:  0.8, 0.6, 0.4, 0.3, 0.2 good - fairly smooth, 0.1 not strong enough
                    // * Green GeekServo: 0.2 to 0.3 to 0.4 to 0.5 (more robust), 0.6 start too strong zigzag, with Ki=0, Kd=0
                    // ** Keep Kp at 0.5 since needs that strength as it drifts to right naturally @ VcsFloor, still keep Ki, Kd=0 for simplicity
                    // 
                    // * was 0.5, but 0.0 to test 90_degrees turn -0r- seem to leave at 0.5
                    _system_StringVariable_AsComment = "EV3:Adjust: 1.0 +/-0.5 then +/-0.1:"
                    sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_Fix__Int = 0
                }
                if (true) {
                    _system_StringVariable_AsComment = "D"
                    sensor_Compass_Direction__Detect_Delta_Old__Degrees__Int = 0
                    sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int = 0
                    sensor_Compass_Direction__Detect_Delta_Change__Int = 0
                    // * Blue FiTech: 0.5 too wild swings, 0.25 is much doable, try 0.2
                    // * For now, turn off for simplicity test for Kp-O
                    _system_StringVariable_AsComment = "EV3:Adjust: 1.0 +/-0.5 then +/-0.1: "
                    sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_Fix__Int = 0
                }
                if (true) {
                    _system_StringVariable_AsComment = "I"
                    sensor_Compass_Direction__Detect_Delta_Summation_Old__Int = 0
                    sensor_Compass_Direction__Detect_Delta_Summation_Now__Int = 0
                    // * Blue FiTech: >>  0/.04 bad, 0.03 not bad, 0.02 better, 0.01 not good
                    // * 0.02 was good, but let's turn off since erratic = 0
                    _system_StringVariable_AsComment = "EV3:Adjust: 0.05 +/-0.01 then +/-0.005:"
                    sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_Fix__Int = 0
                }
            }
            if (true) {
                mode_Force_Straight_Pdi_Magnetometer_Bool = false
            }
            if (true) {
                // Even at Max Value, still leave one LED off to show CW/CCW orientation. Thus only 25-1=24 Leds usable
                graph_Number__Leds_Counter_MAX__BASE1__INT = 24
                q_Note_2.rq_Show_String_For_Note_Small_Fn(
                    "x4 so 0.25 appears as 1 LedDot"
                )
                graph_Number__Leds_Counter_SensitvityZoomin_MULTIPLIER_INT = 4
            }
            if (true) {
                // Blank Space
                motor_Direction_Left_Str = " "
                // Blank Space
                motor_Direction_Right_Str = " "
            }
        }
        if (true) {
            q_Note_2.rq_Show_String_For_Note_Small_Fn(
                "Any usage of 'compass heading' will trigger calibration if needed."
            )
            sensor_Compass_Direction__Bot_Now__Degrees__Int = input.compassHeading()
        }


        q_Note_2.rq_Show_String_For_Note_Small_Fn(
            "User FrontEnd Parameters"
        )
        if (true) {
            // 0.1 :)
            sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_MagicConvert__Int = k_p_in
            // 0.1 :)
            sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_MagicConvert__Int = k_d_in
            // 0.01 :)
            sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_MagicConvert__Int = k_i_in
        }

        q_Note_2.rq_Show_String_For_Note_Small_Fn(
            "System BackEnd Parameters"
        )
        if (true) {
            // was 20
            motor_PowerAdjust_Stage1_AvoidIdleDeadzone_AsOffset_ForTurnsAndStraights_Int = motor_poweradjust_stage1_avoididledeadzone_asoffset_forturnsandstraights_int
            motor_PowerAdjust_Stage2_PdiBaseMotion_AsOffset_ForStraights_Int = motor_poweradjust_stage2_pdibasemotion_asoffset_forstraights_int
        }

    // * frequency: was 1000 >> 500 msec
    loops.everyInterval(500, function () {
        if (!mode_Force_Straight_Pdi_Magnetometer_Bool) {
            rq_Run_PID_Motion_InnerLoop_Fn()
        }
    })




    }


    /// JWC TODO

    /**
    * rq_Run_PID_Motion_Fn
    * @param turning_offset_int_in number
    * @param timer_countdown_sec_int_in number
    */
    //% block="run pid motion:|* turning_offset_int_in[0..270]: $turning_offset_int_in|* timer_countdown_sec_int_in[0..60](sec): $timer_countdown_sec_int_in"
    //% turning_offset_int_in.min=0 turning_offset_int_in.max=270
    //% timer_countdown_sec_int_in.min=0 timer_countdown_sec_int_in.max=60
    //% weight=85 blockGap=8
    //% inlineInputMode=external    
    export function rq_Run_PID_Motion_Fn(turning_offset_int_in: number = 10, timer_countdown_sec_int_in: number = 5): void {

        sensor_Compass_Direction__Detect_Target_TurningOffset__Degrees__Int = turning_offset_int_in
        mode_State_Run_TimeSystem_Countdown_Max_Sec_Int = timer_countdown_sec_int_in

        do_Set_SensorCompassDirection_Stage01A_DetectBot_Degrees_Int_Fn()
        do_Set_SensorCompassDirection_Stage01B_DetectTarget_Degrees_Int_Fn()
        do_Set_SensorCompassDirection_Stage02_DetectDelta_Now_Degrees_Int_Fn()

        if (true) {
            sensor_Compass_Direction__Detect_Delta_Old__Degrees__Int = sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int
            ///jwc y mode_Force_Straight_Pdi_Magnetometer_Bool = true
            basic.showIcon(IconNames.Sword)
            ///jwc y basic.pause(500)
        }

        ///jwc ?
        ///jwc y rq_Run_PID_Motion_InnerLoop_Fn()

        mode_State_Run_TimeSystem_Start_Sec_Int = control.millis() / 1000
        mode_State_Run_TimeSystem_Countdown_Now_Sec_Int = mode_State_Run_TimeSystem_Countdown_Max_Sec_Int
        while (mode_State_Run_TimeSystem_Countdown_Now_Sec_Int > 0) {
            ///jwc y needs to run or freeze, unless deactivate 'mode_Force_Straight_Pdi_Magnetometer_Bool = true':  rq_Run_PID_Motion_InnerLoop_Fn()
            mode_State_Run_TimeSystem_Countdown_Now_Sec_Int = mode_State_Run_TimeSystem_Countdown_Max_Sec_Int - ((control.millis() / 1000) - mode_State_Run_TimeSystem_Start_Sec_Int)
        }
    }


    ///jwc y // * frequency: was 1000 >> 500 msec
    ///jwc y loops.everyInterval(500, function () {
    ///jwc y     if (!mode_Force_Straight_Pdi_Magnetometer_Bool) {
    ///jwc y         rq_Run_PID_Motion_InnerLoop_Fn()
    ///jwc y     }
    ///jwc y })


    /**
    * rq_Run_PID_Motion_InnerLoop_Fn
    */
    //% block="run pid motion inner_loop:"
    //% weight=83 blockGap=8
    //% inlineInputMode=external    
    export function rq_Run_PID_Motion_InnerLoop_Fn(): void {

        do_Set_SensorCompassDirection_Stage01A_DetectBot_Degrees_Int_Fn()
        do_Set_SensorCompassDirection_Stage02_DetectDelta_Now_Degrees_Int_Fn()

        if (mode_Force_Straight_Pdi_Magnetometer_Bool) {
            do_Set_SensorCompassDirection_Stage03_Turn_Or_Straight_PDI_Func()
        }

        if (true) {
            q_Dashboard.rq_Show_String_For_Oled_SmallFont_Fn(
                "* T:" + q_Algorithm.rq_Get_Number_WithColumnPadding_AsStringOut_Fn(
                    sensor_Compass_Direction__Detect_Target__Degrees__Int,
                    3,
                    0
                ) + " -B:" + q_Algorithm.rq_Get_Number_WithColumnPadding_AsStringOut_Fn(
                    sensor_Compass_Direction__Bot_Now__Degrees__Int,
                    3,
                    0
                ) + " =" + q_Algorithm.rq_Get_Number_WithColumnPadding_AsStringOut_Fn(
                    sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int,
                    4,
                    0
                ) + " D" + q_Algorithm.rq_Get_Number_WithColumnPadding_AsStringOut_Fn(
                    sensor_Compass_Direction__Detect_Target_TurningOffset__Degrees__Int,
                    3,
                    0
                ),
                0,
                0
            )
            q_Dashboard.rq_Show_String_For_Oled_SmallFont_Fn(
                "Kp" + q_Algorithm.rq_Get_Number_WithColumnPadding_AsStringOut_Fn(
                    sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_MagicConvert__Int,
                    4,
                    2
                ) + " Kd" + q_Algorithm.rq_Get_Number_WithColumnPadding_AsStringOut_Fn(
                    sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_MagicConvert__Int,
                    4,
                    2
                ) + " Ki" + q_Algorithm.rq_Get_Number_WithColumnPadding_AsStringOut_Fn(
                    sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_MagicConvert__Int,
                    5,
                    3
                ),
                0,
                1
            )
            q_Dashboard.rq_Show_String_For_Oled_SmallFont_Fn(
                "P:" + q_Algorithm.rq_Get_Number_WithColumnPadding_AsStringOut_Fn(
                    sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_Fix__Int,
                    5,
                    1
                ) + "  D:" + q_Algorithm.rq_Get_Number_WithColumnPadding_AsStringOut_Fn(
                    sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_Fix__Int,
                    5,
                    1
                ) + "  I:" + q_Algorithm.rq_Get_Number_WithColumnPadding_AsStringOut_Fn(
                    sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_Fix__Int,
                    5,
                    1
                ),
                0,
                2
            )
            q_Dashboard.rq_Show_String_For_Oled_SmallFont_Fn(
                "* PDI:" + q_Algorithm.rq_Get_Number_WithColumnPadding_AsStringOut_Fn(
                    sensor_Compass_Direction__Detect_Delta__DegreesToPower__K_Total_Fix__Int,
                    5,
                    1
                ) + " L:" + motor_Direction_Left_Str + q_Algorithm.rq_Get_Number_WithColumnPadding_AsStringOut_Fn(
                    motor_Power_Left_Int,
                    3,
                    0
                ) + " R:" + motor_Direction_Right_Str + q_Algorithm.rq_Get_Number_WithColumnPadding_AsStringOut_Fn(
                    motor_Power_Right_Int,
                    3,
                    0
                ),
                0,
                3
            )
            q_Dashboard.rq_Show_String_For_Oled_SmallFont_Fn(
                "1_P(" + q_Algorithm.rq_Get_Number_WithColumnPadding_AsStringOut_Fn(
                    sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int,
                    4,
                    0
                ) + "x" + q_Algorithm.rq_Get_Number_WithColumnPadding_AsStringOut_Fn(
                    sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_MagicConvert__Int,
                    4,
                    2
                ) + ")=" + q_Algorithm.rq_Get_Number_WithColumnPadding_AsStringOut_Fn(
                    sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_Fix__Int,
                    5,
                    1
                ),
                0,
                4
            )
            q_Dashboard.rq_Show_String_For_Oled_SmallFont_Fn(
                "2_D(" + q_Algorithm.rq_Get_Number_WithColumnPadding_AsStringOut_Fn(
                    sensor_Compass_Direction__Detect_Delta_Change__Int,
                    4,
                    0
                ) + "x" + q_Algorithm.rq_Get_Number_WithColumnPadding_AsStringOut_Fn(
                    sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_MagicConvert__Int,
                    4,
                    2
                ) + ")=" + q_Algorithm.rq_Get_Number_WithColumnPadding_AsStringOut_Fn(
                    sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_Fix__Int,
                    5,
                    1
                ),
                0,
                5
            )
            q_Dashboard.rq_Show_String_For_Oled_SmallFont_Fn(
                "3_I(" + q_Algorithm.rq_Get_Number_WithColumnPadding_AsStringOut_Fn(
                    sensor_Compass_Direction__Detect_Delta_Summation_Now__Int,
                    4,
                    0
                ) + "x" + q_Algorithm.rq_Get_Number_WithColumnPadding_AsStringOut_Fn(
                    sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_MagicConvert__Int,
                    5,
                    3
                ) + ")=" + q_Algorithm.rq_Get_Number_WithColumnPadding_AsStringOut_Fn(
                    sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_Fix__Int,
                    5,
                    1
                ),
                0,
                6
            )
            q_Dashboard.rq_Show_String_For_Oled_SmallFont_Fn(
                "Dead:" + q_Algorithm.rq_Get_Number_WithColumnPadding_AsStringOut_Fn(
                    motor_PowerAdjust_Stage1_AvoidIdleDeadzone_AsOffset_ForTurnsAndStraights_Int,
                    2,
                    0
                ) + " Base:" + q_Algorithm.rq_Get_Number_WithColumnPadding_AsStringOut_Fn(
                    motor_PowerAdjust_Stage2_PdiBaseMotion_AsOffset_ForStraights_Int,
                    2,
                    0
                ) + " Time:" + q_Algorithm.rq_Get_Number_WithColumnPadding_AsStringOut_Fn(
                    mode_State_Run_TimeSystem_Countdown_Now_Sec_Int,
                    2,
                    0
                ),
                0,
                7
            )
            q_Note_2.rq_Show_String_For_Note_Small_Fn(
                "Multiply the first parameter for such multiple in granularity"
            )
            do_GraphNumber_Func(sensor_Compass_Direction__Detect_Delta__DegreesToPower__K_Total_Fix__Int * graph_Number__Leds_Counter_SensitvityZoomin_MULTIPLIER_INT, graph_Number__Leds_Counter_MAX__BASE1__INT)
            // Delay to prevent Cpu-Overload
            basic.pause(cpu_Throttle_DELAY_MSEC_INT)
        }
    }

    function do_Set_SensorCompassDirection_Stage01A_DetectBot_Degrees_Int_Fn() {
        _system_StringVariable_AsComment = "Adjust compass 180-degrees for facing bot_rear -&- Wrap-around '>360'"
        sensor_Compass_Direction__Bot_Now__Degrees__Int = input.compassHeading() + 180
        if (sensor_Compass_Direction__Bot_Now__Degrees__Int > 360) {
            sensor_Compass_Direction__Bot_Now__Degrees__Int += -360
        }
    }

    function do_Set_SensorCompassDirection_Stage01B_DetectTarget_Degrees_Int_Fn() {
        sensor_Compass_Direction__Detect_Target__Degrees__Int = sensor_Compass_Direction__Bot_Now__Degrees__Int + sensor_Compass_Direction__Detect_Target_TurningOffset__Degrees__Int
        if (sensor_Compass_Direction__Detect_Target__Degrees__Int > 360) {
            sensor_Compass_Direction__Detect_Target__Degrees__Int += -360
        } else if (sensor_Compass_Direction__Detect_Target__Degrees__Int < 0) {
            sensor_Compass_Direction__Bot_Now__Degrees__Int += 360
        }
    }

    function do_Set_SensorCompassDirection_Stage02_DetectDelta_Now_Degrees_Int_Fn() {
        sensor_Compass_Direction__Detect_Delta_Old__Degrees__Int = sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int
        sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int = sensor_Compass_Direction__Detect_Target__Degrees__Int - sensor_Compass_Direction__Bot_Now__Degrees__Int
        // Though Kp-Fix will be fine, Ki-Fix will be thrown-off/misinterpret as failure to reverse course to continue zig-zag across target_degrees
        _system_StringVariable_AsComment = "Bot takes shortest turn possible, esp. when > 180 or < -180, thus find supplement by add +/- 360"
        _system_StringVariable_AsComment = "Though Kp-Fix will be fine, Ki-Fix will be thrown-off/misinterpret as failure to reverse course to continue zig-zag across target_degrees "
        if (sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int > 180) {
            sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int = sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int - 360
        } else if (sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int < -180) {
            sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int = sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int + 360
        }
    }

    function do_Set_SensorCompassDirection_Stage03_Turn_Or_Straight_PDI_Func() {
        if (mode_Force_Straight_Pdi_Magnetometer_Bool) {
            if (true) {
                // Proportional-Turning Error-Adjustments based on Distance from Target
                _system_StringVariable_AsComment = "P: Pivot: *** Proportional-Boost To Error(Bot_Distance_From_Target)"
                sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_Fix__Int = sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int * sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_MagicConvert__Int
            }
            if (true) {
                // *** K-Integral Fix: Integral (Summation) of Above Proportional-Turning Error-Adjustments: Boost when Error Not Constructively Decreasing (Destructively Either Stuck or Increasing)
                // 
                // *** Ki Fix: **** Greater Weight/Summation of Positive KpFix (Cw) = Greater Positive Enahance_Now/Momentum_Later (Cw) **** Greater Weight/Summation of Negative KpFix (CCw) = Greater Negatve Enahance_Now/Momentum_Later (CCw)
                // 
                // Accel/De-Accel Boost/Enhancer
                _system_StringVariable_AsComment = "D: Difference: *** When P DEC, D -Value (CCW) *** When P INC, D +Value (CW)"
                sensor_Compass_Direction__Detect_Delta_Change__Int = sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int - sensor_Compass_Direction__Detect_Delta_Old__Degrees__Int
                sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_Fix__Int = sensor_Compass_Direction__Detect_Delta_Change__Int * sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_MagicConvert__Int
                ///jwc y sensor_Compass_Direction__Detect_Delta_Old__Degrees__Int = sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int
            }
            if (true) {
                // *** K-Integral Fix: Integral (Summation) of Above Proportional-Turning Error-Adjustments: Boost when Error Not Constructively Decreasing (Destructively Either Stuck or Increasing)
                // 
                // *** Ki Fix: **** Greater Weight/Summation of Positive KpFix (Cw) = Greater Positive Enahance_Now/Momentum_Later (Cw) **** Greater Weight/Summation of Negative KpFix (CCw) = Greater Negatve Enahance_Now/Momentum_Later (CCw)
                // 
                // Kp (CC/CCW) Boost/Enhancer + Residue-Momentum Boost/Enhancer
                _system_StringVariable_AsComment = "I: Include: *** Add P to Running_Total "
                sensor_Compass_Direction__Detect_Delta_Summation_Old__Int = sensor_Compass_Direction__Detect_Delta_Summation_Now__Int
                sensor_Compass_Direction__Detect_Delta_Summation_Now__Int = sensor_Compass_Direction__Detect_Delta_Summation_Now__Int + sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int
                sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_Fix__Int = sensor_Compass_Direction__Detect_Delta_Summation_Now__Int * sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_MagicConvert__Int
            }
            if (true) {
                _system_StringVariable_AsComment = "P + D + I Fixes"
                sensor_Compass_Direction__Detect_Delta__DegreesToPower__K_Total_Fix__Int = sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_Fix__Int + sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_Fix__Int + sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_Fix__Int
                q_Note_2.rq_Show_String_For_Note_Small_Fn(
                    "'motor_Power_Left/Right_Int' Stage 1: Set to Base Value"
                )
                if (true) {
                    motor_Power_Left_Int = motor_Power_STOP_INT + (motor_PowerAdjust_Stage1_AvoidIdleDeadzone_AsOffset_ForTurnsAndStraights_Int + motor_PowerAdjust_Stage2_PdiBaseMotion_AsOffset_ForStraights_Int)
                    motor_Power_Right_Int = motor_Power_STOP_INT + (motor_PowerAdjust_Stage1_AvoidIdleDeadzone_AsOffset_ForTurnsAndStraights_Int + motor_PowerAdjust_Stage2_PdiBaseMotion_AsOffset_ForStraights_Int)
                }
                // Ktotal: CCW, CW, or None Icons (and Place 'motor_PowerDeadzone_OffsetFromIdle_AsNewPowerStartBase_Int' Appropiately Relative to Center-Idle_90_Degrees for PID-Turn Only
                if (sensor_Compass_Direction__Detect_Delta__DegreesToPower__K_Total_Fix__Int > 1 * sensor_Compass_Direction__Detect_TargetWindow_Degrees_Int) {
                    q_Note_3.rq_Show_String_For_Note_Small_Fn(
                        "CW: +"
                    )
                    if (true) {
                        motor_Direction_Left_Str = "^"
                        motor_Direction_Right_Str = "v"
                    }
                    q_Note_2.rq_Show_String_For_Note_Small_Fn(
                        "'motor_Power_Left/Right_Int' Stage 2: Add Offset Value"
                    )
                    // Add Ktotal (and 'motor_PowerForwardMin_OffsetFromIdle_Int' for PID-0Straight)
                    if (true) {
                        motor_Power_Left_Int = motor_Power_Left_Int + sensor_Compass_Direction__Detect_Delta__DegreesToPower__K_Total_Fix__Int
                        motor_Power_Right_Int = motor_Power_Right_Int - sensor_Compass_Direction__Detect_Delta__DegreesToPower__K_Total_Fix__Int
                    }
                } else if (sensor_Compass_Direction__Detect_Delta__DegreesToPower__K_Total_Fix__Int < -1 * sensor_Compass_Direction__Detect_TargetWindow_Degrees_Int) {
                    q_Note_3.rq_Show_String_For_Note_Small_Fn(
                        "CCW: -"
                    )
                    if (true) {
                        motor_Direction_Left_Str = "v"
                        motor_Direction_Right_Str = "^"
                    }
                    q_Note_2.rq_Show_String_For_Note_Small_Fn(
                        "'motor_Power_Left/Right_Int' Stage 2: Add Offset Value"
                    )
                    // Add Ktotal (and 'motor_PowerForwardMin_OffsetFromIdle_Int' for PID-0Straight)
                    if (true) {
                        motor_Power_Left_Int = motor_Power_Left_Int + sensor_Compass_Direction__Detect_Delta__DegreesToPower__K_Total_Fix__Int
                        motor_Power_Right_Int = motor_Power_Right_Int - sensor_Compass_Direction__Detect_Delta__DegreesToPower__K_Total_Fix__Int
                    }
                } else {
                    if (true) {
                        motor_Direction_Left_Str = " "
                        motor_Direction_Right_Str = " "
                    }
                }
            }
            q_Hardware.rq_Set_PowerMotorsViaBlueRedBlackPins_Fn(
                rq_PortGroup_BlueRedBlack_PortIds_Enum.S1_MotorLeft__S0_MotorRight,
                motor_Power_Left_Int,
                motor_Power_Right_Int
            )
        }
    }


    // do_GraphNumber_Func
    function do_GraphNumber_Func(number_to_graph_in: number, number_to_graph__absolute_max_in: number) {
        if (true) {
            _system_StringVariable_AsComment = "Start {0,0) or (4,4): 25 leds"
            _local_graph_number__leds_needed__base1__int = Math.idiv(Math.constrain(Math.abs(number_to_graph_in), 0, number_to_graph__absolute_max_in), number_to_graph__absolute_max_in / graph_Number__Leds_Counter_MAX__BASE1__INT)
            basic.clearScreen()
            _local_graph_number__leds_counter_index__base0__int = 0
            if (number_to_graph_in >= 0) {
                _system_StringVariable_AsComment = "Bot CW: start (4,4): led #24[base-0] & light leds backward (step -1)"
                _local_graph_number__leds_counter_index__iteration_step__int = -1
                _local_graph_number__leds_counter_index__base0__int = 24
                // No-Need to invert/reverse direction for true clockwise
                _local_graph_number__x_axis_invert_offset__int = 0
                q_Note_1.rq_Show_String_For_Note_Small_Fn(
                    "Pivot Dot is brightest"
                )
                led.plotBrightness(2, 0, 255)
            } else {
                _system_StringVariable_AsComment = "Bot CCW: start (0,0): led #00[base-0] & light leds forward (step +1)"
                _local_graph_number__leds_counter_index__iteration_step__int = 1
                _local_graph_number__leds_counter_index__base0__int = 0
                // Need to invert/reverse direction for true counter-clockwise
                _local_graph_number__x_axis_invert_offset__int = -4
                q_Note_1.rq_Show_String_For_Note_Small_Fn(
                    "Pivot Dot is brightest"
                )
                led.plotBrightness(2, 4, 255)
            }
            for (let index = 0; index < _local_graph_number__leds_needed__base1__int; index++) {
                if (_local_graph_number__leds_counter_index__base0__int == 0 || _local_graph_number__leds_counter_index__base0__int == 24) {
                    q_Note_1.rq_Show_String_For_Note_Small_Fn(
                        "Header Dot is brightest"
                    )
                    led.plotBrightness(Math.abs(_local_graph_number__leds_counter_index__base0__int % 5 + _local_graph_number__x_axis_invert_offset__int), Math.idiv(_local_graph_number__leds_counter_index__base0__int, 5), 255)
                } else {
                    led.plotBrightness(Math.abs(_local_graph_number__leds_counter_index__base0__int % 5 + _local_graph_number__x_axis_invert_offset__int), Math.idiv(_local_graph_number__leds_counter_index__base0__int, 5), 32)
                }
                _local_graph_number__leds_counter_index__base0__int += _local_graph_number__leds_counter_index__iteration_step__int
            }
        }
    }


    function do_Confirm_Req_Increase_Func() {
        basic.clearScreen()
        led.plot(0, 2)
        basic.pause(500)
    }
    function do_Confirm_Req_Decrease_Func() {
        basic.clearScreen()
        led.plot(4, 2)
        basic.pause(500)
    }

    ///jwc o input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    ///jwc o     do_Mode_State_Run_PID_Fn(0, 30, 0.1, 0.1, 0.01)
    ///jwc o })

    input.onButtonPressed(Button.AB, function () {
        input.calibrateCompass()
    })

    input.onButtonPressed(Button.A, function () {
        sensor_Compass_Direction__Detect_Target_TurningOffset__Degrees__Int += 10
        do_Set_SensorCompassDirection_Stage01B_DetectTarget_Degrees_Int_Fn()
    })
    input.onButtonPressed(Button.B, function () {
        sensor_Compass_Direction__Detect_Target_TurningOffset__Degrees__Int += -10
        do_Set_SensorCompassDirection_Stage01B_DetectTarget_Degrees_Int_Fn()
    })

    input.onGesture(Gesture.TiltLeft, function () {
        sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_MagicConvert__Int = sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_MagicConvert__Int + 0.05
        do_Confirm_Req_Increase_Func()
    })
    input.onGesture(Gesture.TiltRight, function () {
        sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_MagicConvert__Int = sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_MagicConvert__Int + 0.005
        do_Confirm_Req_Increase_Func()
    })
    input.onGesture(Gesture.LogoUp, function () {
        sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_MagicConvert__Int = sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_MagicConvert__Int + 0.05
        do_Confirm_Req_Increase_Func()
    })

    // * Since not enough buttons, group all decrements under one button since not common usage
    input.onGesture(Gesture.LogoDown, function () {
        sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_MagicConvert__Int = sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_MagicConvert__Int - 0.05
        sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_MagicConvert__Int = sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_MagicConvert__Int - 0.005
        sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_MagicConvert__Int = sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_MagicConvert__Int - 0.05
        do_Confirm_Req_Decrease_Func()
    })

    input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
        // * Nothing for now
    })


}