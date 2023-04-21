input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    q_Note_3.rq_Show_String_For_Note_Big_Fn(
    "CodeStack B: Straight@Angle30: PID_Yes"
    )
    qPlus_Autonomous.rq_Run_PID_Motion_Fn(
    30,
    15
    )
    q_Hardware.rq_Set_PowerMotorsViaBlueRedBlackPins_Fn(
    rq_PortGroup_BlueRedBlack_PortIds_Enum.S1_MotorLeft__S0_MotorRight,
    0,
    0
    )
    qPlus_Autonomous.rq_Run_PID_Motion_Fn(
    -60,
    15
    )
    q_Hardware.rq_Set_PowerMotorsViaBlueRedBlackPins_Fn(
    rq_PortGroup_BlueRedBlack_PortIds_Enum.S1_MotorLeft__S0_MotorRight,
    0,
    0
    )
})
input.onGesture(Gesture.LogoUp, function () {
    q_Note_3.rq_Show_String_For_Note_Big_Fn(
    "CodeStack C: Straight: PID_Not"
    )
    q_Note_1.rq_Show_String_For_Note_Small_Fn(
    "OLED since not use 'RQ100 PID Dashboard'"
    )
    q_Dashboard.rq_Show_Oled_Cleared_Fn(
    )
    q_Hardware.rq_Set_PowerMotorsViaBlueRedBlackPins_Fn(
    rq_PortGroup_BlueRedBlack_PortIds_Enum.S1_MotorLeft__S0_MotorRight,
    25,
    25
    )
    q_Timer.rq_Set_ContinueCurrentState_CountdownTimer_Fn(120, rq_Time_Units_Enum.Seconds)
    q_Hardware.rq_Set_PowerMotorsViaBlueRedBlackPins_Fn(
    rq_PortGroup_BlueRedBlack_PortIds_Enum.S1_MotorLeft__S0_MotorRight,
    0,
    0
    )
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    q_Note_3.rq_Show_String_For_Note_Big_Fn(
    "CodeStack A: Straight: PID_Yes"
    )
    qPlus_Autonomous.rq_Run_PID_Motion_Fn(
    0,
    120
    )
    q_Hardware.rq_Set_PowerMotorsViaBlueRedBlackPins_Fn(
    rq_PortGroup_BlueRedBlack_PortIds_Enum.S1_MotorLeft__S0_MotorRight,
    0,
    0
    )
})
basic.showIcon(IconNames.Happy)
qPlus_Autonomous.rq_Set_PID_Settings_Fn(
0,
0,
0,
15,
10,
true
)
basic.pause(2000)
