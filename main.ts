input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    quest_Autonomous.rq_Run_PID_Motion_Fn(
    0,
    3
    )
    quest_Timer.rq_Set_ContinueCurrentState_CountdownTimer_Fn(2, rq_Time_Units_Enum.Seconds)
    quest_Autonomous.rq_Run_PID_Motion_Fn(
    90,
    3
    )
    quest_Timer.rq_Set_ContinueCurrentState_CountdownTimer_Fn(2, rq_Time_Units_Enum.Seconds)
    quest_Autonomous.rq_Run_PID_Motion_Fn(
    90,
    3
    )
    quest_Timer.rq_Set_ContinueCurrentState_CountdownTimer_Fn(2, rq_Time_Units_Enum.Seconds)
    quest_Autonomous.rq_Run_PID_Motion_Fn(
    90,
    3
    )
    quest_Hardware.rq_Set_PowerMotorsViaBlueRedBlackPins_Fn(
    rq_PortGroup_BlueRedBlack_PortIds_Enum.S1_MotorLeft__S0_MotorRight,
    0,
    0
    )
})
basic.showIcon(IconNames.Happy)
basic.pause(2000)
quest_Autonomous.rq_Set_PID_Settings_Fn(
0.2,
0.15,
0.015,
12,
20
)
basic.forever(function () {
	
})
