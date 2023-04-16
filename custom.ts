/**
* Use this file to define custom functions and blocks.
* Read more at https://makecode.microbit.org/blocks/custom
*/

// *** IMPORTANT NOTES ***
//
// * Naming Scheme
//   ** global_Variable_Etc
//   ** local_variable_etc
//   ** name_Space_Etc (since treated like an class/object, so like a 'global_Variable')
//
// * Functions Listed First_In (Here BackEnd): Listed Last_Out (There FrontEnd)
// * Move all test code from 'maint.blocks/.ts' to 'test.ts' for final publish
// * Quest will use namespace weight of 51 (50 bad) to 69 to below Standard Namespace 'LED' 
//   ** but above any 3rd Party Namespaces to avoid competinbg confusion
// * Proactive approach to Commenting:
//   ** With more upfront transperency w/ 3 note levels: gray, green, blue, 
//   ** less need for debugging/troubleshooting notes - thus 1 level: yellow
// * For full/complete upload to Github, press 'Github' button 
//   ** while in any file within JavaScript mode, not 'Blocks' mode
// * Note any edits is saved real-time since a cloud-editor, even before Github upload
// * TYJ 1 sec spin ~ 45 deg, 2 sec spin ~ 90 deg, 2 sec spin ~ 180, 4 sec spin ~ 360, thus sufficient to max 5 sec spin

//
// TODO
// * Add ': void' to function headers, though not required
//

// enum MyEnum {
//    //% block="one"
//    One,
//    //% block="two"
//    Two
// }

enum rq_PortGroup_BlueRedBlack_PortIds_Enum {
    //% block="S1_MotorLeft__S0_MotorRight"
    S1_MotorLeft__S0_MotorRight,
    //% block="S3_MotorLeft__S2_MotorRight"
    S3_MotorLeft__S2_MotorRight,
}

enum rq_Time_Units_Enum {
    //% block="seconds"
    Seconds,
    //% block="milliseconds"
    Milliseconds,
}

enum rq_Motion_Direction_Enum {
    //% block="Forward"
    Forward,
    //% block="Backward"
    Backward,
    //% block="Left"
    Left,
    //% block="Right"
    Right,
    //% block="Stop"
    Stop,
}

enum turn_Duration_Enum {
    //% block="20 msec"
    msec_20,
    //% block="40 msec"
    msec_40,
    //% block="60 msec"
    msec_60,
    //% block="80 msec"
    msec_80,
    //% block="100 msec"
    msec_100,
    //% block="200 msec"
    msec_200,
    //% block="400 msec"
    msec_400,
    //% block="600 msec"
    msec_600,
    //% block="800 msec"
    msec_800,
    //% block="1000 msec(1 sec)"
    msec_1000,
    //% block="2000 msec(2 sec)"
    msec_2000,
    //% block="3000 msec(3 sec)"
    msec_3000,
    //% block="4000 msec(4 sec)"
    msec_4000,
    //% block="5000 msec(5 sec)"
    msec_5000,
}
// 'Spin' as default since is more bi-directional (left and right capable)
enum turn_Type_Enum {
    //% block="Spin(Both Wheels Rotate in Opposite Directions)"
    Spin,
    //% block="Pivot(One Wheel Rotates While Other Wheel Rotates_Not)"
    Pivot,
}
enum turn_Direction_Enum {
    //% block="right"
    right,
    //% block="left"
    left,
}
enum turn_Power_Enum {
    //% block="Lo(30%)"
    Lo,
    //% block="Mi(65%)"
    Mi,
    //% block="Hi(100%)"
    Hi,
}


// * Though it seems that can define global vars here, but not advised 
// ** since memory storage would be safer within 'namespace'
//
///y let deviceType_Bot_Bool = false
///y let deviceType_Controller_Bool = true


// * Go ahead and define here, since multiple 'namespaces'
//
// * Global Variables & Constants
//
// * Default to Bot and not to Controller for most basic total 1 'micro:bit' setup (No Controller)
//
let deviceType_Bot_Bool = true
let deviceType_Controller_Bool = false
//
let _debug_Serial_Print_Bool = false
//
let motor_Power_No = 0
let motor_Power_Lo = 30
let motor_Power_Mi = 65
let motor_Power_Hi = 100


///y //% weight=100 color=#0fbc11 icon=""
///y //% weight=100 color=#0000ff icon="\uf5b8"
///y //% weight=100 color=#0000ff icon="\uf005"
/// was 90
///n //% weight=99 color=#808080 icon=""
///y //% weight=99 color=#808080 icon="uf005"
/// 91


//
// Teal #008080 rgb(0, 128, 128)
// Green #008000 rgb(0, 128, 0)
//
/**
 * q_Dashboard blocks
 */
//% weight=69 color=#008000 icon="Q"
namespace q_Dashboard {
    // OLED12864_I2C: Setup
    //
    OLED12864_I2C.init(60)
    OLED12864_I2C.on()
    OLED12864_I2C.zoom(false)
    OLED12864_I2C.clear()
 
    /**
    * rq_Show_Oled_Cleared_Fn
    */
    //% block="show oled cleared"
    //% weight=53 blockGap=8
    //% inlineInputMode=external
    export function rq_Show_Oled_Cleared_Fn() {
        OLED12864_I2C.clear()
    }
    /**
    * rq_Show_String_For_Oled_BigFont_Fn
    * @param textStrIn string
    * @param xColBase0In number
    * @param yRowBase0In number
    */
    //% block="show oled big_font (AutoSetup I2cAddress=60, SCL=Pin19, SDA=Pin20)|textStrIn: $textStrIn|xColBase0In[0..11]: $xColBase0In|yRowBase0In[0..3]: $yRowBase0In"
    //% xColBase0In.min=0 xColBase0In.max=11
    //% yRowBase0In.min=0 yRowBase0In.max=3
    //% weight=52 blockGap=8
    //% inlineInputMode=external
    export function rq_Show_String_For_Oled_BigFont_Fn(textStrIn: string, xColBase0In: number, yRowBase0In: number) {
        // Default Values
        let colorIntIn = 1 // default
        let textStrInLenMAX = 12  // Char Max with Zoom:On

        let textStrInLen = textStrIn.length

        // post blank-pad 'textStrIn' to full text width max
        //
        while (textStrIn.length < textStrInLenMAX) {
            textStrIn += " "
        }

        // always setup 'zoom'_in appropriately
        OLED12864_I2C.zoom(true)

        OLED12864_I2C.showString(
            xColBase0In,
            yRowBase0In,
            textStrIn,
            colorIntIn
        )
    }
    /**
     * rq_Show_String_For_Oled_SmallFont_Fn
     * @param textStrIn string
     * @param xColBase0In number
     * @param yRowBase0In number
     */
    //% block="show oled small_font (AutoSetup I2cAddress=60, SCL=Pin19, SDA=Pin20)|textStrIn: $textStrIn|xColBase0In[0..24]: $xColBase0In|yRowBase0In[0..7]: $yRowBase0In"
    //% xColBase0In.min=0 xColBase0In.max=24
    //% yRowBase0In.min=0 yRowBase0In.max=7
    //% weight=50 blockGap=8
    //% inlineInputMode=external
    export function rq_Show_String_For_Oled_SmallFont_Fn(textStrIn: string, xColBase0In: number, yRowBase0In: number) {
        // Default Values
        let colorIntIn = 1 // default
        let textStrInLenMAX = 25  // Char Max with Zoom:Off

        let textStrInLen = textStrIn.length

        // post blank-pad 'textStrIn' to full text width max
        //
        while (textStrIn.length < textStrInLenMAX) {
            textStrIn += " "
        }

        // always setup 'zoom'_in appropriately
        OLED12864_I2C.zoom(false)

        OLED12864_I2C.showString(
            xColBase0In,
            yRowBase0In,
            textStrIn,
            colorIntIn
        )
    }

    /**
     * rq_Show_MotionDirection_Fn
     * @param motionDirectionIn rq_Motion_Direction_Enum
     */
    //% block="show motion_direction: $motionDirectionIn"
    //% weight=81 blockGap=8
    export function rq_Show_MotionDirection_Fn(motionDirectionIn: rq_Motion_Direction_Enum): void {
        switch (motionDirectionIn) {
            // * if on 'bot', then 5x5LED is upside-down - so Yes_Flip graphics
            // * if on 'controller', then 5x5 is rightside-up - so No_Flip graphics
            //
            case rq_Motion_Direction_Enum.Forward:
                if (deviceType_Bot_Bool) {
                    led.plot(2, 4)
                }
                else if (deviceType_Controller_Bool) {
                    led.plot(2, 0)
                }
                ///jwc y OLED12864_I2C.showString(
                ///jwc y     0,
                ///jwc y     0,
                ///jwc y     "^",
                ///jwc y     1
                ///jwc y )
                break
            case rq_Motion_Direction_Enum.Backward:
                if (deviceType_Bot_Bool) {
                    led.plot(2, 0)
                }
                else if (deviceType_Controller_Bool) {
                    led.plot(2, 4)
                }
                ///jwc y OLED12864_I2C.showString(
                ///jwc y     0,
                ///jwc y     0,
                ///jwc y     "v",
                ///jwc y     1
                ///jwc y )
                break
            case rq_Motion_Direction_Enum.Left:
                if (deviceType_Bot_Bool) {
                    led.plot(4, 2)
                }
                else if (deviceType_Controller_Bool) {
                    led.plot(0, 2)
                }
                ///jwc y OLED12864_I2C.showString(
                ///jwc y     0,
                ///jwc y     0,
                ///jwc y     "<",
                ///jwc y     1
                ///jwc y )
                break
            case rq_Motion_Direction_Enum.Right:
                if (deviceType_Bot_Bool) {
                    led.plot(0, 2)
                }
                else if (deviceType_Controller_Bool) {
                    led.plot(4, 2)
                }
                ///jwc y OLED12864_I2C.showString(
                ///jwc y     0,
                ///jwc y     0,
                ///jwc y     ">",
                ///jwc y     1
                ///jwc y )
                break
            case rq_Motion_Direction_Enum.Stop:
                led.plot(2, 2)
                ///jwc y OLED12864_I2C.showString(
                ///jwc y     0,
                ///jwc y     0,
                ///jwc y     ".",
                ///jwc y     1
                ///jwc y )
                break
            default:
                basic.showLeds(`
                . . . . .
                . # . # .
                . . . . .
                . # # # .
                # . . . #
                `)
                ///jwc y OLED12864_I2C.showString(
                ///jwc y     0,
                ///jwc y     0,
                ///jwc y     "?",
                ///jwc y     1
                ///jwc y )
                break
        }
    }
}


//
// Orange #ff7f00 rgb(255, 127, 0)
//
/**
 * q_Timer blocks
 */
//% weight=67 color=#ff7f00 icon="Q"
namespace q_Timer {
    /**
     * rq_Set_ContinueCurrentState_CountdownTimer_Fn
     * @param countdownTimer number
     * @param timeUnits rq_Time_Units_Enum
     */
    //% block="set current state to continue for: $countdownTimer $timeUnits"
    //% weight=70 blockGap=8
    //// y countdownTimer.min=0 countdownTimer.max=5000
    export function rq_Set_ContinueCurrentState_CountdownTimer_Fn(countdownTimer: number, timeUnits: rq_Time_Units_Enum): void {
        let countdownTimerNew = 0
        // Minimum border check
        if (countdownTimer < 0) { countdownTimer = 0 }
        if (timeUnits == rq_Time_Units_Enum.Seconds) {
            countdownTimerNew = countdownTimer * 1000
            basic.pause(countdownTimerNew)
        } else if (timeUnits == rq_Time_Units_Enum.Milliseconds) {
            countdownTimerNew = countdownTimer
            basic.pause(countdownTimerNew)
        }
    }
}


//
// color=#808080 = Gray: rgb(128, 128, 128)
// color=#3f3f3f = Dark Gray: rgb(63, 63, 63)
// ** to better differentiate vs. Silver Note
// * Gray like a 'black/gray box' which needs more transparency
//
/**
 * q_Algorithm blocks
 */
//% weight=65 color=#3f3f3f icon="Q"
namespace q_Algorithm {
    /**
    * rq_Get_Number_WithColumnPadding_AsStringOut_Fn
    * @param number_in number
    * @param string_len_max_in number
    * @param decimal_places_in number
    */
    //% block="get number with_column_padding as_string_out|number_in: $number_in|string_len_max_in: $string_len_max_in|decimal_places_in  $decimal_places_in"
    //% weight=60 blockGap=8
    //% inlineInputMode=external
    export function rq_Get_Number_WithColumnPadding_AsStringOut_Fn(number_in: number, string_len_max_in: number, decimal_places_in: number = 0) {
        let local_number_with_fixed_decimal_deci = Math.round(number_in * 10 ** decimal_places_in) / 10 ** decimal_places_in

        let local_string_out = convertToText(local_number_with_fixed_decimal_deci)

        let local_loop_count_max = string_len_max_in - local_string_out.length

        for (let index = 0; index < local_loop_count_max; index++) {
            local_string_out = " " + local_string_out
        }
        return local_string_out
    }

}


//
//
// 1: Silver #C0C0C0 rgb(192, 192, 192)
// 2: Lime #00FF00 rgb(0, 255, 0)
// 3: Aqua #00FFFF rgb(0, 255, 255)
// 4: Yellow #FFFF00 rgb(255, 255, 0)
// 5: Red #FF0000 rgb(255,0,0)
//
//

/**
 * q_Note_1 blocks
 */
//% weight=59 color=#C0C0C0 icon="Q"
namespace q_Note_1 {
    /**
     * rq_Show_String_For_Note_Small_Fn
     * @param textStrIn string
     */
    //% block="note small: $textStrIn"
    //% weight=80 blockGap=8
    //% inlineInputMode=external
    export function rq_Show_String_For_Note_Small_Fn(textStrIn: string) {
    }
    // * Add space in front of '|' such as ' |' creates reliable 1row spacing
    /**
     * rq_Show_String_For_Note_Big_Fn
     * @param textStrIn string
     */
    //% block=" |note big: $textStrIn |"
    //% weight=80 blockGap=8
    //% inlineInputMode=external
    export function rq_Show_String_For_Note_Big_Fn(textStrIn: string) {
    }
}

/**
 * q_Note_2 blocks
 */
//% weight=58 color=#00FF00 icon="Q"
namespace q_Note_2 {
    /**
     * rq_Show_String_For_Note_Small_Fn
     * @param textStrIn string
     */
    //% block="note small: $textStrIn"
    //% weight=80 blockGap=8
    //% inlineInputMode=external
    export function rq_Show_String_For_Note_Small_Fn(textStrIn: string) {
    }
    // * Add space in front of '|' such as ' |' creates reliable 1row spacing
    /**
     * rq_Show_String_For_Note_Big_Fn
     * @param textStrIn string
     */
    //% block=" |note big: $textStrIn |"
    //% weight=80 blockGap=8
    //% inlineInputMode=external
    export function rq_Show_String_For_Note_Big_Fn(textStrIn: string) {
    }
}

/**
 * q_Note_3 blocks
 */
//% weight=57 color=#00FFFF icon="Q"
namespace q_Note_3 {
    /**
     * rq_Show_String_For_Note_Small_Fn
     * @param textStrIn string
     */
    //% block="note small: $textStrIn"
    //% weight=80 blockGap=8
    //% inlineInputMode=external
    export function rq_Show_String_For_Note_Small_Fn(textStrIn: string) {
    }
    // * Add space in front of '|' such as ' |' creates reliable 1row spacing
    /**
     * rq_Show_String_For_Note_Big_Fn
     * @param textStrIn string
     */
    //% block=" |note big: $textStrIn |"
    //% weight=80 blockGap=8
    //% inlineInputMode=external
    export function rq_Show_String_For_Note_Big_Fn(textStrIn: string) {
    }
}

/**
 * q_Note_4 blocks
 */
//% weight=56 color=#FFFF00 icon="Q"
namespace q_Note_4 {
    /**
     * rq_Show_String_For_Note_Small_Fn
     * @param textStrIn string
     */
    //% block="note small: $textStrIn"
    //% weight=80 blockGap=8
    //% inlineInputMode=external
    export function rq_Show_String_For_Note_Small_Fn(textStrIn: string) {
    }
    // * Add space in front of '|' such as ' |' creates reliable 1row spacing
    /**
     * rq_Show_String_For_Note_Big_Fn
     * @param textStrIn string
     */
    //% block=" |note big: $textStrIn |"
    //% weight=80 blockGap=8
    //% inlineInputMode=external
    export function rq_Show_String_For_Note_Big_Fn(textStrIn: string) {
    }
}

/**
 * q_Note_5 blo5ks
 */
//% weight=55 color=#FF0000 icon="Q"
namespace q_Note_5 {
    /**
     * rq_Show_String_For_Note_Small_Fn
     * @param textStrIn string
     */
    //% block="note small: $textStrIn"
    //% weight=80 blockGap=8
    //% inlineInputMode=external
    export function rq_Show_String_For_Note_Small_Fn(textStrIn: string) {
    }
    // * Add space in front of '|' such as ' |' creates reliable 1row spacing
    /**
     * rq_Show_String_For_Note_Big_Fn
     * @param textStrIn string
     */
    //% block=" |note big: $textStrIn |"
    //% weight=80 blockGap=8
    //% inlineInputMode=external
    export function rq_Show_String_For_Note_Big_Fn(textStrIn: string) {
    }
}


// dark blue #0000ff TOO DARK, CANNOT SEE BLACK BOUNDARY LINES
// light blue rgb(127, 190, 255) #7fbeff TOO LIGHT
// less_light blue rgb(0, 127, 255) ##007fff to dark that matches other groups
// rgb(127,127,255)  #7f7fff Good Purple to not drown out blue_borderlines

// * not too dark since would cover thin-black-boundaries
/**
 * q_Hardware blocks
 */
//% weight=53 color=#7f7fff icon="Q"
namespace q_Hardware {
    /// //
    /// // * Global Variables Q Constants
    /// //
    /// // * Default to Bot and not to Controller for most basic total 1 'micro:bit' setup (No Controller)
    /// //
    /// let deviceType_Bot_Bool = true
    /// let deviceType_Controller_Bool = false
    /// //
    /// let _debug_Serial_Print_Bool = false

    /**
     * rq_Set_PowerMotorsViaBlueRedBlackPins_Fn
     * @param portIdsIn rq_PortGroup_BlueRedBlack_PortIds_Enum
     * @param powerLeftIn number
     * @param powerRightIn number
     */
    //% block="set servo_motors:|* ports: $portIdsIn|* left motor power: $powerLeftIn|* right motor power: $powerRightIn"
    //% powerLeftIn.min=-100 powerLeftIn.max=100
    //% powerRightIn.min=-100 powerRightIn.max=100
    //% weight=80 blockGap=8
    //% inlineInputMode=external
    export function rq_Set_PowerMotorsViaBlueRedBlackPins_Fn(portIdsIn: rq_PortGroup_BlueRedBlack_PortIds_Enum, powerLeftIn: number, powerRightIn: number): void {

        // Motor-Left Conversion: Same Rotational Direction
        let motor_Power_L = Math.map(powerLeftIn, -100, 100, 0, 360)
        // Motor-Right Conversion: Opposite Rotational Direction
        let motor_Power_R = Math.map(powerRightIn, -100, 100, 360, 0)

        switch (portIdsIn) {
            case rq_PortGroup_BlueRedBlack_PortIds_Enum.S1_MotorLeft__S0_MotorRight:
                wuKong.setServoAngle(wuKong.ServoTypeList._360, wuKong.ServoList.S1, motor_Power_L)
                wuKong.setServoAngle(wuKong.ServoTypeList._360, wuKong.ServoList.S0, motor_Power_R)
                if (_debug_Serial_Print_Bool) {
                    serial.writeLine("* rq_PowerMotorsViaBlueRedBlackPins_Fn: " + powerLeftIn + " " + powerRightIn + " >> " + motor_Power_L + " " + motor_Power_R)
                }
                break
            case rq_PortGroup_BlueRedBlack_PortIds_Enum.S3_MotorLeft__S2_MotorRight:
                wuKong.setServoAngle(wuKong.ServoTypeList._360, wuKong.ServoList.S3, motor_Power_L)
                wuKong.setServoAngle(wuKong.ServoTypeList._360, wuKong.ServoList.S2, motor_Power_R)
                if (_debug_Serial_Print_Bool) {
                    serial.writeLine("* rq_PowerMotorsViaBlueRedBlackPins_Fn: " + powerLeftIn + " " + powerRightIn + " >> " + motor_Power_L + " " + motor_Power_R)
                }
                break
            default:
                if (_debug_Serial_Print_Bool) {
                    serial.writeLine("* ERROR: rq_PowerMotorsViaBlueRedBlackPins_Fn: " + powerLeftIn + " " + powerRightIn + " >> " + motor_Power_L + " " + motor_Power_R)
                }
                break
        }
    }


    /**
     * rq_Set_PowerMotorsViaBlueRedBlackPins_WithTimer_Fn
     * @param portIdsIn rq_PortGroup_BlueRedBlack_PortIds_Enum
     * @param powerLeftIn number
     * @param powerRightIn number
     * @param turn_Duration_In turn_Duration_Enum
     */
    /// jwc o  block="set servo_motors w/ timer: $portIdsIn|@ left motor power: $powerLeftIn|@ right motor power: $powerRightIn|turn_Duration_In $turn_Duration_In"
    //% block="set servo_motors w/ timer:|* ports: $portIdsIn|* left motor power: $powerLeftIn|* right motor power: $powerRightIn|* turn_Duration: $turn_Duration_In"
    //% powerLeftIn.min=-100 powerLeftIn.max=100
    //% powerRightIn.min=-100 powerRightIn.max=100
    //% weight=78 blockGap=8
    //% inlineInputMode=external
    export function rq_Set_PowerMotorsViaBlueRedBlackPins_WithTimer_Fn(portIdsIn: rq_PortGroup_BlueRedBlack_PortIds_Enum, powerLeftIn: number, powerRightIn: number, turn_Duration_In: turn_Duration_Enum): void {

        basic.showIcon(IconNames.SmallHeart)

        // Motor-Left Conversion: Same Rotational Direction
        let motor_Power_L = Math.map(powerLeftIn, -100, 100, 0, 360)
        // Motor-Right Conversion: Opposite Rotational Direction
        let motor_Power_R = Math.map(powerRightIn, -100, 100, 360, 0)

        let turn_Duration = 0

        switch (turn_Duration_In) {
            case turn_Duration_Enum.msec_20:
                turn_Duration = 20
                break  // out of these case statements
            case turn_Duration_Enum.msec_40:
                turn_Duration = 40
                break  // out of these case statements
            case turn_Duration_Enum.msec_60:
                turn_Duration = 60
                break  // out of these case statements
            case turn_Duration_Enum.msec_80:
                turn_Duration = 80
                break  // out of these case statements
            case turn_Duration_Enum.msec_100:
                turn_Duration = 100
                break  // out of these case statements
            case turn_Duration_Enum.msec_200:
                turn_Duration = 200
                break  // out of these case statements
            case turn_Duration_Enum.msec_400:
                turn_Duration = 400
                break  // out of these case statements
            case turn_Duration_Enum.msec_600:
                turn_Duration = 600
                break  // out of these case statements
            case turn_Duration_Enum.msec_800:
                turn_Duration = 800
                break  // out of these case statements
            case turn_Duration_Enum.msec_1000:
                turn_Duration = 1000
                break  // out of these case statements
            case turn_Duration_Enum.msec_2000:
                turn_Duration = 2000
                break  // out of these case statements
            case turn_Duration_Enum.msec_3000:
                turn_Duration = 3000
                break  // out of these case statements
            case turn_Duration_Enum.msec_4000:
                turn_Duration = 4000
                break  // out of these case statements
            case turn_Duration_Enum.msec_5000:
                turn_Duration = 5000
                break  // out of these case statements
        }

        switch (portIdsIn) {
            case rq_PortGroup_BlueRedBlack_PortIds_Enum.S1_MotorLeft__S0_MotorRight:
                wuKong.setServoAngle(wuKong.ServoTypeList._360, wuKong.ServoList.S1, motor_Power_L)
                wuKong.setServoAngle(wuKong.ServoTypeList._360, wuKong.ServoList.S0, motor_Power_R)
                if (_debug_Serial_Print_Bool) {
                    serial.writeLine("* rq_PowerMotorsViaBlueRedBlackPins_Fn: " + powerLeftIn + " " + powerRightIn + " >> " + motor_Power_L + " " + motor_Power_R)
                }
                break
            case rq_PortGroup_BlueRedBlack_PortIds_Enum.S3_MotorLeft__S2_MotorRight:
                wuKong.setServoAngle(wuKong.ServoTypeList._360, wuKong.ServoList.S3, motor_Power_L)
                wuKong.setServoAngle(wuKong.ServoTypeList._360, wuKong.ServoList.S2, motor_Power_R)
                if (_debug_Serial_Print_Bool) {
                    serial.writeLine("* rq_PowerMotorsViaBlueRedBlackPins_Fn: " + powerLeftIn + " " + powerRightIn + " >> " + motor_Power_L + " " + motor_Power_R)
                }
                break
            default:
                if (_debug_Serial_Print_Bool) {
                    serial.writeLine("* ERROR: rq_PowerMotorsViaBlueRedBlackPins_Fn: " + powerLeftIn + " " + powerRightIn + " >> " + motor_Power_L + " " + motor_Power_R)
                }
                break
        }

        // diagnostics
        q_Dashboard.rq_Show_Oled_Cleared_Fn
        q_Dashboard.rq_Show_String_For_Oled_SmallFont_Fn(convertToText(motor_Power_L) + " " + convertToText(motor_Power_R) + " " + convertToText(turn_Duration), 0, 0)

        // timer
        q_Timer.rq_Set_ContinueCurrentState_CountdownTimer_Fn(turn_Duration, rq_Time_Units_Enum.Milliseconds)

        // stop
        q_Hardware.rq_Set_PowerMotorsViaBlueRedBlackPins_Fn(portIdsIn, 0, 0)

        // diagnostics
        basic.showIcon(IconNames.Heart)

    }


    /**
     * rq_Set_Turn_WithTimer_Fn
     * @param port_Ids_In rq_PortGroup_BlueRedBlack_PortIds_Enum
     * @param turn_Type_In rq_Turn_Type_Enum
     * @param turn_Direction_In turn_Direction_Enum
     * @param turn_Power_In turn_Power_Enum
     * @param turn_Duration_In turn_Duration_Enum
     */
    /// jwc o block="set turn w/ timer: port_Ids_In: $port_Ids_In|turn_Type_In: $turn_Type_In|turn_Direction_In: $turn_Direction_In|turn_Power_In $turn_Power_In|turn_Duration_In $turn_Duration_In"
    /// jwc y block="set turn w/ timer: $port_Ids_In|turn_Type: $turn_Type_In|turn_Direction_In: $turn_Direction_In|turn_Power $turn_Power_In|turn_Duration $turn_Duration_In"
    //% block="set turn w/ timer:|* ports: $port_Ids_In|* turn_Type: $turn_Type_In|* turn_Direction: $turn_Direction_In|* turn_Power: $turn_Power_In|* turn_Duration: $turn_Duration_In"
    //% weight=60 blockGap=8
    //% inlineInputMode=external
    export function rq_Set_Turn_WithTimer_Fn(port_Ids_In: rq_PortGroup_BlueRedBlack_PortIds_Enum, turn_Type_In: turn_Type_Enum, turn_Direction_In: turn_Direction_Enum, turn_Power_In: turn_Power_Enum, turn_Duration_In: turn_Duration_Enum): void {
        
        basic.showIcon(IconNames.SmallHeart)

        let motor_Power_L = 0
        let motor_Power_R = 0

        let turn_Duration = 0
        
        switch (turn_Type_In) {
            case turn_Type_Enum.Pivot:

                switch (turn_Direction_In){                   
                    case turn_Direction_Enum.left:

                        switch (turn_Power_In) {
                            case turn_Power_Enum.Lo:
                                motor_Power_L = motor_Power_No
                                motor_Power_R = motor_Power_Lo
                                break  // out of these case statements
                            case turn_Power_Enum.Mi:
                                motor_Power_L = motor_Power_No
                                motor_Power_R = motor_Power_Mi
                                break  // out of these case statements
                            case turn_Power_Enum.Hi:
                                motor_Power_L = motor_Power_No
                                motor_Power_R = motor_Power_Hi
                                break  // out of these case statements
                        }
                        q_Dashboard.rq_Show_MotionDirection_Fn( rq_Motion_Direction_Enum.Left )
                        break  // out of these case statements

                    case turn_Direction_Enum.right:

                        switch (turn_Power_In){
                            case turn_Power_Enum.Lo:
                                motor_Power_L = motor_Power_Lo
                                motor_Power_R = motor_Power_No
                                break  // out of these case statements
                            case turn_Power_Enum.Mi:
                                motor_Power_L = motor_Power_Mi
                                motor_Power_R = motor_Power_No
                                break  // out of these case statements
                            case turn_Power_Enum.Hi:
                                motor_Power_L = motor_Power_Hi
                                motor_Power_R = motor_Power_No
                                break  // out of these case statements
                        }
                        q_Dashboard.rq_Show_MotionDirection_Fn(rq_Motion_Direction_Enum.Right)
                        break  // out of these case statements
                }
                break  // out of these case statements

            case turn_Type_Enum.Spin: 

                switch (turn_Direction_In) {
                    case turn_Direction_Enum.left:

                        switch (turn_Power_In) {
                            case turn_Power_Enum.Lo:
                                motor_Power_L = motor_Power_Lo * (-1)
                                motor_Power_R = motor_Power_Lo
                                break  // out of these case statements
                            case turn_Power_Enum.Mi:
                                motor_Power_L = motor_Power_Mi * (-1)
                                motor_Power_R = motor_Power_Mi
                                break  // out of these case statements
                            case turn_Power_Enum.Hi:
                                motor_Power_L = motor_Power_Hi * (-1)
                                motor_Power_R = motor_Power_Hi
                                break  // out of these case statements
                        }
                        q_Dashboard.rq_Show_MotionDirection_Fn(rq_Motion_Direction_Enum.Left)
                        break  // out of these case statements

                    case turn_Direction_Enum.right:

                        switch (turn_Power_In) {
                            case turn_Power_Enum.Lo:
                                motor_Power_L = motor_Power_Lo
                                motor_Power_R = motor_Power_Lo * (-1)
                                break  // out of these case statements
                            case turn_Power_Enum.Mi:
                                motor_Power_L = motor_Power_Mi
                                motor_Power_R = motor_Power_Mi * (-1)
                                break  // out of these case statements
                            case turn_Power_Enum.Hi:
                                motor_Power_L = motor_Power_Hi
                                motor_Power_R = motor_Power_Hi * (-1)
                                break  // out of these case statements
                        }
                        q_Dashboard.rq_Show_MotionDirection_Fn(rq_Motion_Direction_Enum.Right)
                        break  // out of these case statements
                }
                break  // out of these case statements
        }
    
        switch (turn_Duration_In) {
            case turn_Duration_Enum.msec_20:
                turn_Duration = 20
                break  // out of these case statements
            case turn_Duration_Enum.msec_40:
                turn_Duration = 40
                break  // out of these case statements
            case turn_Duration_Enum.msec_60:
                turn_Duration = 60
                break  // out of these case statements
            case turn_Duration_Enum.msec_80:
                turn_Duration = 80
                break  // out of these case statements
            case turn_Duration_Enum.msec_100:
                turn_Duration = 100
                break  // out of these case statements
            case turn_Duration_Enum.msec_200:
                turn_Duration = 200
                break  // out of these case statements
            case turn_Duration_Enum.msec_400:
                turn_Duration = 400
                break  // out of these case statements
            case turn_Duration_Enum.msec_600:
                turn_Duration = 600
                break  // out of these case statements
            case turn_Duration_Enum.msec_800:
                turn_Duration = 800
                break  // out of these case statements
            case turn_Duration_Enum.msec_1000:
                turn_Duration = 1000
                break  // out of these case statements
            case turn_Duration_Enum.msec_2000:
                turn_Duration = 2000
                break  // out of these case statements
            case turn_Duration_Enum.msec_3000:
                turn_Duration = 3000
                break  // out of these case statements
            case turn_Duration_Enum.msec_4000:
                turn_Duration = 4000
                break  // out of these case statements
            case turn_Duration_Enum.msec_5000:
                turn_Duration = 5000
                break  // out of these case statements
        }

        // diagnostics
        q_Dashboard.rq_Show_Oled_Cleared_Fn
        q_Dashboard.rq_Show_String_For_Oled_SmallFont_Fn(convertToText(motor_Power_L) + " " + convertToText(motor_Power_R) + " " + convertToText(turn_Duration),0,0)   
        
        // turn
        q_Hardware.rq_Set_PowerMotorsViaBlueRedBlackPins_Fn(port_Ids_In, motor_Power_L, motor_Power_R)
        
        // timer
        q_Timer.rq_Set_ContinueCurrentState_CountdownTimer_Fn(turn_Duration, rq_Time_Units_Enum.Milliseconds)
        
        // stop
        q_Hardware.rq_Set_PowerMotorsViaBlueRedBlackPins_Fn(port_Ids_In, 0, 0)

        // diagnostics
        basic.showIcon(IconNames.Heart)
    }

    /**
     * set_Settings_Fn
     * @param deviceTypeBotBoolIn boolean
     * @param deviceTypeControllerBoolIn boolean
     */
    //% block="set settings(required in 'on start' stack):|* 'deviceType_Bot_Bool': $deviceTypeBotBoolIn|* 'deviceType_Controller_Bool': $deviceTypeControllerBoolIn"
    //% weight=100 blockGap=8
    //% inlineInputMode=external
    export function set_Settings_Fn(deviceTypeBotBoolIn: boolean, deviceTypeControllerBoolIn: boolean): void {

        deviceType_Bot_Bool = deviceTypeBotBoolIn
        deviceType_Controller_Bool = deviceTypeControllerBoolIn

        OLED12864_I2C.clear()
        OLED12864_I2C.showString(
            0,
            0,
            "[ RQ100 Set Settings ]",
            1
        )
        OLED12864_I2C.showString(
            0,
            1,
            "* Bot:" + convertToText(deviceType_Bot_Bool).substr(0, 1) + "| Controller:" + convertToText(deviceType_Controller_Bool).substr(0, 1),
            1
        )
        basic.pause(2000)
    }
}


