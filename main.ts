basic.showIcon(IconNames.Happy)
quest_Basic.rq_Set_ContinueCurrentState_CountdownTimer_Fn(2, rq_Time_Units_Enum.Seconds)
basic.forever(function () {
    quest_Note_1.rq_Show_String_For_Note_Big_Fn(
    "1"
    )
    quest_Note_1.rq_Show_String_For_Note_Small_Fn(
    "11"
    )
    quest_Note_2.rq_Show_String_For_Note_Big_Fn(
    "2"
    )
    quest_Note_2.rq_Show_String_For_Note_Small_Fn(
    "22"
    )
    quest_Note_3.rq_Show_String_For_Note_Big_Fn(
    "3"
    )
    quest_Note_3.rq_Show_String_For_Note_Small_Fn(
    "33"
    )
    quest_Note_4.rq_Show_String_For_Note_Big_Fn(
    "4"
    )
    quest_Note_4.rq_Show_String_For_Note_Small_Fn(
    "44"
    )
    quest_Basic.rq_Show_String_For_Oled_SmallFont_Fn(
    quest_Basic.rq_Get_Number_WithColumnPadding_AsStringOut_Fn(
    randint(1000, 2000) / randint(0, 3),
    24,
    randint(0, 3)
    ),
    0,
    0
    )
    quest_Basic.rq_Show_String_For_Oled_SmallFont_Fn(
    quest_Basic.rq_Get_Number_WithColumnPadding_AsStringOut_Fn(
    randint(1000, 2000) / randint(0, 3),
    24,
    randint(0, 3)
    ),
    0,
    7
    )
    quest_Basic.rq_Set_ContinueCurrentState_CountdownTimer_Fn(2, rq_Time_Units_Enum.Seconds)
    quest_Basic.rq_ShowString_For_Oled_BigFont_Fn(
    quest_Basic.rq_Get_Number_WithColumnPadding_AsStringOut_Fn(
    randint(1000, 2000) / randint(0, 3),
    12,
    randint(0, 3)
    ),
    0,
    0
    )
    quest_Basic.rq_ShowString_For_Oled_BigFont_Fn(
    quest_Basic.rq_Get_Number_WithColumnPadding_AsStringOut_Fn(
    randint(1000, 2000) / randint(0, 3),
    12,
    randint(0, 3)
    ),
    0,
    3
    )
    quest_Basic.rq_Set_ContinueCurrentState_CountdownTimer_Fn(2, rq_Time_Units_Enum.Seconds)
})
