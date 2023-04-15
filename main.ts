input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    q_Autonomous.rq_Run_PID_Motion_Fn(
    0,
    30
    )
    q_Timer.rq_Set_ContinueCurrentState_CountdownTimer_Fn(2, rq_Time_Units_Enum.Seconds)
    q_Autonomous.rq_Run_PID_Motion_Fn(
    90,
    3
    )
    q_Timer.rq_Set_ContinueCurrentState_CountdownTimer_Fn(2, rq_Time_Units_Enum.Seconds)
    q_Autonomous.rq_Run_PID_Motion_Fn(
    90,
    3
    )
    q_Timer.rq_Set_ContinueCurrentState_CountdownTimer_Fn(2, rq_Time_Units_Enum.Seconds)
    q_Autonomous.rq_Run_PID_Motion_Fn(
    90,
    3
    )
    q_Hardware.rq_Set_PowerMotorsViaBlueRedBlackPins_Fn(
    rq_PortGroup_BlueRedBlack_PortIds_Enum.S1_MotorLeft__S0_MotorRight,
    0,
    0
    )
})
basic.showIcon(IconNames.Happy)
basic.pause(2000)
q_Autonomous.rq_Set_PID_Settings_Fn(
0.2,
0.15,
0.015,
12,
20
)
