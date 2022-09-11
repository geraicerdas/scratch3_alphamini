const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const formatMessage = require('format-message');
const AdapterBaseClient = require('./codelab_adapter_base.js');

// const blockIconURI = require("./icon.svg");
const blockIconURI =
    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNC4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0i5Zu+5bGCXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDAgNDAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQwIDQwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPg0KCS5zdDB7ZmlsbDojRDFEMUQxO30NCgkuc3Qxe2ZpbGw6I0JBQkFCQTt9DQoJLnN0MntmaWxsOiNGM0YzRjM7fQ0KCS5zdDN7ZmlsbDojRkZGRkZGO30NCgkuc3Q0e2ZpbGw6IzNBM0EzQTt9DQo8L3N0eWxlPg0KPHRpdGxlPuaJqeWxleaPkuS7tumFjeWbvuiuvuiuoTwvdGl0bGU+DQo8Zz4NCgk8Zz4NCgkJPGVsbGlwc2UgdHJhbnNmb3JtPSJtYXRyaXgoMC4wODgzIC0wLjk5NjEgMC45OTYxIDAuMDg4MyA3LjEwMiA1Ny4yNjY1KSIgY2xhc3M9InN0MCIgY3g9IjM0LjgzIiBjeT0iMjQuNzUiIHJ4PSI2LjAzIiByeT0iMi4xIi8+DQoJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zMC4zOSwyMy44NWMtMC4xNywxLjU3LTAuNDQsNC41NCwxLjQ5LDYuMTJjMC42MSwwLjUyLDEuODMsMS4yMiwyLjUzLDAuNzljMC44Ny0wLjYxLTAuMjYtMi41MywwLTUuODUNCgkJCWMwLjI2LTMuNTgsMi4wMS01LjI0LDEuMDUtNi4yYy0wLjYxLTAuNjEtMS45Mi0wLjQ0LTIuNzEtMC4wOUMzMC43NCwxOS41NywzMC40OCwyMi4xOSwzMC4zOSwyMy44NXoiLz4NCgk8L2c+DQoJPGc+DQoJCTxlbGxpcHNlIHRyYW5zZm9ybT0ibWF0cml4KDAuMDg4MyAtMC45OTYxIDAuOTk2MSAwLjA4ODMgNi43ODExIDU2Ljk0NTYpIiBjbGFzcz0ic3QwIiBjeD0iMzQuNSIgY3k9IjI0Ljc3IiByeD0iNi4wMyIgcnk9IjIuMSIvPg0KCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMzAuMDQsMjMuODVjLTAuMTcsMS41Ny0wLjQ0LDQuNTQsMS40OSw2LjEyYzAuNjEsMC41MiwxLjgzLDEuMjIsMi41MywwLjc5YzAuODctMC42MS0wLjI2LTIuNTMsMC01Ljg1DQoJCQljMC4yNi0zLjU4LDIuMDEtNS4yNCwxLjA1LTYuMmMtMC42MS0wLjYxLTEuOTItMC40NC0yLjcxLTAuMDlDMzAuNDgsMTkuNTcsMzAuMjIsMjIuMTksMzAuMDQsMjMuODV6Ii8+DQoJPC9nPg0KCTxnPg0KCQk8ZWxsaXBzZSB0cmFuc2Zvcm09Im1hdHJpeCgwLjk5NjEgLTAuMDg4MyAwLjA4ODMgMC45OTYxIC0yLjE2MjkgMC41NTA5KSIgY2xhc3M9InN0MCIgY3g9IjUuMTUiIGN5PSIyNC43MiIgcng9IjIuMSIgcnk9IjYuMDMiLz4NCgkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTkuNiwyMy44NWMwLjE3LDEuNTcsMC40NCw0LjU0LTEuNDksNi4xMmMtMC42MSwwLjUyLTEuODMsMS4yMi0yLjUzLDAuNzljLTAuODctMC42MSwwLjI2LTIuNTMsMC01Ljg1DQoJCQljLTAuMjYtMy41OC0yLjAxLTUuMjQtMS4wNS02LjJjMC42MS0wLjYxLDEuOTItMC40NCwyLjcxLTAuMDlDOS4yNSwxOS41Nyw5LjUyLDIyLjE5LDkuNiwyMy44NXoiLz4NCgk8L2c+DQoJPGc+DQoJCTxlbGxpcHNlIHRyYW5zZm9ybT0ibWF0cml4KDAuOTk2MSAtMC4wODgzIDAuMDg4MyAwLjk5NjEgLTIuMTYyNSAwLjU1ODcpIiBjbGFzcz0ic3QwIiBjeD0iNS4yMyIgY3k9IjI0LjcyIiByeD0iMi4xIiByeT0iNi4wMyIvPg0KCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNOS43OCwyMy44NWMwLjE3LDEuNTcsMC40NCw0LjU0LTEuNDksNi4xMmMtMC42MSwwLjUyLTEuODMsMS4yMi0yLjUzLDAuNzljLTAuODctMC42MSwwLjI2LTIuNTMsMC01Ljg1DQoJCQljLTAuMjYtMy41OC0yLjAxLTUuMjQtMS4wNS02LjJjMC42MS0wLjYxLDEuOTItMC40NCwyLjcxLTAuMDlDOS4zNCwxOS41Nyw5LjYsMjIuMTksOS43OCwyMy44NXoiLz4NCgk8L2c+DQoJPGc+DQoJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yMi44OCwzNC4wN2gtNi4yYy01Ljc3LDAtMTAuNDgtNC43Mi0xMC40OC0xMC40OHYtNS45NGMwLTIuMjcsMS44My00LjE5LDQuMTktNC4xOWgxOS4yMg0KCQkJYzIuMSwwLDMuNzYsMS42NiwzLjc2LDMuNzZ2Ni4zOEMzMy4zNiwyOS4zNSwyOC42NSwzNC4wNywyMi44OCwzNC4wN3oiLz4NCgkJPHBhdGggY2xhc3M9InN0MiIgZD0iTTIyLjQ0LDM0LjU5aC01LjE1Yy01LjI0LDAtOS41Mi00LjI4LTkuNTItOS41MnYtNS42OGMwLTIuMDEsMS43NS0zLjc2LDMuODQtMy43NmgxNi45NQ0KCQkJYzEuODMsMCwzLjQxLDEuNDksMy40MSwzLjQxdjYuMTJDMzEuOTcsMzAuNCwyNy42OSwzNC41OSwyMi40NCwzNC41OXoiLz4NCgk8L2c+DQoJPGc+DQoJCTxjaXJjbGUgY2xhc3M9InN0MSIgY3g9IjEzLjYyIiBjeT0iMjMuNzYiIHI9IjMuODQiLz4NCgkJPGNpcmNsZSBjbGFzcz0ic3QzIiBjeD0iMTMuOCIgY3k9IjIzLjc2IiByPSIzLjE0Ii8+DQoJCTxjaXJjbGUgY2xhc3M9InN0NCIgY3g9IjEzLjk3IiBjeT0iMjMuNjgiIHI9IjIuMjciLz4NCgkJPGNpcmNsZSBjbGFzcz0ic3QxIiBjeD0iMjYuMiIgY3k9IjIzLjc2IiByPSIzLjg0Ii8+DQoJCTxjaXJjbGUgY2xhc3M9InN0MyIgY3g9IjI1Ljk0IiBjeT0iMjMuNzYiIHI9IjMuMTQiLz4NCgkJPGNpcmNsZSBjbGFzcz0ic3Q0IiBjeD0iMjUuNzYiIGN5PSIyMy42OCIgcj0iMi4yNyIvPg0KCQk8Y2lyY2xlIGNsYXNzPSJzdDMiIGN4PSIxMi42NiIgY3k9IjIyLjM2IiByPSIwLjQ0Ii8+DQoJCTxjaXJjbGUgY2xhc3M9InN0MyIgY3g9IjI0LjM3IiBjeT0iMjIuMTkiIHI9IjAuNDQiLz4NCgk8L2c+DQoJPGc+DQoJCTxnPg0KCQkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTI0LjI4LDE0LjA3Yy0wLjg3LDIuOC0xLjY2LDUuNDItNC43Miw1LjMzYy0zLjA2LTAuMDktMy44NC0yLjYyLTQuNjMtNS41Yy0wLjYxLTIuMS0xLjc1LTQuNTQtMC4wOS02LjQ2DQoJCQkJYzEuNjYtMS45Miw0LjgtMS45Miw0Ljg5LTEuOTJjMS45MiwwLDMuODQsMC43OSw0Ljk4LDIuMDFDMjYuMzgsOS40NCwyNS4wNywxMS43OSwyNC4yOCwxNC4wN3oiLz4NCgkJPC9nPg0KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzAuMzksMTYuNDJjLTIuNjIsMi40NS03LjE2LDIuODgtOC4xMiwxLjQ5Yy0wLjUyLTAuODcsMS4zMS0xLjgzLDIuMS01LjI0YzAuNjEtMi42Mi0wLjA5LTMuNjcsMC42MS00LjE5DQoJCQljMS41Ny0xLjE0LDcuMTYsMi4wMSw2Ljk5LDUuMjRDMzEuOTcsMTUuMDMsMzEuMDEsMTUuOSwzMC4zOSwxNi40MnoiLz4NCgkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTkuMDgsMTYuNDJjMi42MiwyLjQ1LDcuMTYsMi44OCw4LjEyLDEuNDljMC41Mi0wLjg3LTEuMzEtMS44My0yLjEtNS4yNEMxNC41LDEwLjA1LDE1LjE5LDksMTQuNSw4LjQ4DQoJCQljLTEuNTctMS4xNC03LjE2LDIuMDEtNi45OSw1LjI0QzcuNTEsMTUuMDMsOC40NywxNS45LDkuMDgsMTYuNDJ6Ii8+DQoJPC9nPg0KCTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik0xOS43NCwxOC4zNUwxOS43NCwxOC4zNWMtMC43OSwwLTEuNjYtMC40NC0xLjgzLTEuMTRsLTAuNDQtMS4xNGMtMC41Mi0xLjQsMC40NC0zLjE0LDIuMjctMy4xNGwwLDANCgkJYzEuODMsMCwyLjgsMS43NSwyLjI3LDMuMTRsLTAuNDQsMS4xNEMyMS40LDE3LjkxLDIwLjUyLDE4LjM1LDE5Ljc0LDE4LjM1eiIvPg0KPC9nPg0KPC9zdmc+DQo=';
const menuIconURI = blockIconURI;
/**
 * Enum for button parameter values.
 * @readonly
 * @enum {string}
 */

const NODE_ID = 'eim/node_alphamini';
const HELP_URL = 'https://adapter.codelab.club/extension_guide/alphamini/';

// 翻译
const FormHelp = {
    'en': 'help',
    'zh-cn': '帮助'
};

const FormSetEmitTimeout = {
    'en': 'set wait timeout [emit_timeout]s',
    'zh-cn': '设置等待超时时间[emit_timeout]秒'
};

const FormConnect = {
    'en': 'connect alphamini robot [id] type [robot_type]',
    'zh-cn': '连接悟空机器人[id]类型[robot_type]'
};

const FormDisConnect = {
    'en': 'disconnect',
    'zh-cn': '断开连接'
};

const Form_control_node = {
    'en': '[turn] [node_name]',
    'zh-cn': '[turn] [node_name]'
};

const FormMove = {
    'en': 'move [direction] [step] step(s)',
    'zh-cn': '向 [direction] 前进 [step]步'
};

const FormSay = {
    'en': 'say [x]',
    'zh-cn': '说[x]'
};

const FormPlayBehavior = {
    'en': 'perform [name]',
    'zh-cn': '表演舞蹈 [name]'
};

const FormPlayAction = {
    'en': 'play action [name]',
    'zh-cn': '展示动作 [name]'
};

const FormPlayExpression = {
    'en': 'expression [name]',
    'zh-cn': '展示表情 [name]'
};

const Form_sendTopicMessageAndWait = {
    'en': 'broadcast [content] and wait',
    'zh-cn': '广播[content]并等待'
};

const Form_sendTopicMessageAndWait_REPORTER = {
    'en': 'broadcast [content] and wait',
    'zh-cn': '广播[content]并等待'
};

const FormGetInfraredDistance = {
    'en': 'get infrared distance',
    'zh-cn': '前方障碍物距离'
};

// face_detect
const FormFaceDetectCount = {
    'en': 'face count',
    'zh-cn': '识别到人脸数量'
};

const FormFaceAnalysis = {
    'en': 'face info',
    'zh-cn': '人脸信息'
};

const FormFaceRecognise = {
    'en': 'face id',
    'zh-cn': '人脸id'
};

// [started] added by geraicerdas Aug 10, 2022
const FormNewPerform = {
    'en': 'perform [name]',
    'zh-cn': '表演舞蹈 [name]'
};

const FormNewAction = {
    'en': 'action [name]',
    'zh-cn': '表演舞蹈 [name]'
};

const FormNewExpression = {
    'en': 'expression [name]',
    'zh-cn': '展示表情 [name]'
};

const FormGetHeadTouch = {
    'en': 'get head touch',
    'zh-cn': '???'
};

const FormTurnLeftRight = {
    'en': 'turn [direction] [step] time(s)',
    'zh-cn': '??? [direction] [step] ???'
};

// play sound
const FormPlaySound = {
    'en': 'play sound [name]',
    'zh-cn': '??? [name]'
};

// play new sound with drop down list
const FormNewSound = {
    'en': 'play sound [name]',
    'zh-cn': '??? [name]'
};

// play_online_audio
const FormPlayOnlineAudio = {
    'en': 'play sound online [url]',
    'zh-cn': '??? [url]'
};

// stop audio
const FormStopAudio = {
    'en': 'stop all audio',
    'zh-cn': '???'
};

// set volume
const FormSetVolume = {
    'en': 'set volume [value]',
    'zh-cn': '??? [value]'
};

// play wikipedia
const FormPlayWikipedia = {
    'en': 'play wikipedia [name]',
    'zh-cn': '??? [name]'
};

// translate
const FormTranslate = {
    'en': 'translate [fr_lang] [text] into [to_lang]',
    'zh-cn': '??? [fr_lang] [text] ??? [to_lang]'
};

// set_mouth_led
const FormSetMouthLed = {
    'en': 'mouth color [color] duration [duration]',
    'zh-cn': '??? [color] ??? [duration]'
};

// blink_mouth_led
const FormBlinkMouthLed = {
    'en': 'mouth color [color] duration [duration] blink [blinkdelay]',
    'zh-cn': '??? [color] ??? [duration] ??? [blinkdelay]'
};

// turnled
const FormTurnLed = {
    'en': 'turn led [value]',
    'zh-cn': '??? [value]'
};

// stop behavior
const FormStopBehavior = {
    'en': 'stop behavior',
    'zh-cn': '???'
};

// stop_action
const FormStopAction = {
    'en': 'stop action',
    'zh-cn': '???'
};

// stop_all
const FormStopAll = {
    'en': 'stop all [stop_type]',
    'zh-cn': '??? [stop_type]'
};

const colormounth = {

};
// [ended] added by geraicerdas Aug 10, 2022

class AdapterClient {
    onAdapterPluginMessage (msg) {
        this.node_id = msg.message.payload.node_id;
        if (this.node_id === this.NODE_ID) {
            // json 数据, class

            this.adapter_node_content_hat = msg.message.payload.content;
            this.adapter_node_content_reporter = msg.message.payload.content;
            console.log('content ->', msg.message.payload.content);
        }
    }

    constructor (node_id, help_url) {
        this.NODE_ID = node_id;
        this.HELP_URL = help_url;

        this.emit_timeout = 10000; // ms

        this.adapter_base_client = new AdapterBaseClient(
            null, // onConnect,
            null, // onDisconnect,
            null, // onMessage,
            this.onAdapterPluginMessage.bind(this), // onAdapterPluginMessage,
            null, // update_nodes_status,
            null, // node_statu_change_callback,
            null, // notify_callback,
            null, // error_message_callback,
            null // update_adapter_status
        );
    }

    emit_with_messageid (NODE_ID, content) {
        return this.adapter_base_client.emit_with_messageid(
            NODE_ID,
            content,
            this.emit_timeout
        );
    }
}

class Scratch3AlphaminiBlocks {
    constructor (runtime) {
        this.client = new AdapterClient(NODE_ID, HELP_URL, runtime, this);
    }

    /**
     * The key to load & store a target's test-related state.
     * @type {string}
     */
    static get STATE_KEY () {
        return 'Scratch.alphamini';
    }

    _setLocale () {
        let now_locale = '';
        switch (formatMessage.setup().locale) {
        case 'en':
            now_locale = 'en';
            break;
        case 'zh-cn':
            now_locale = 'zh-cn';
            break;
        default:
            now_locale = 'en';
            break;
        }
        return now_locale;
    }
    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        const the_locale = this._setLocale();
        return {
            id: 'alphamini',
            name: 'Alpha Mini',
            colour: '#ff641d',
            colourSecondary: '#c94f18',
            colourTertiary: '#c94f18',
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'open_help_url',
                    blockType: BlockType.COMMAND,
                    text: FormHelp[the_locale],
                    arguments: {}
                },
                {
                    opcode: 'set_emit_timeout',
                    blockType: BlockType.COMMAND,
                    text: FormSetEmitTimeout[the_locale],
                    arguments: {
                        emit_timeout: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 10.0
                        }
                    }
                },
                {
                    opcode: 'control_node',
                    blockType: BlockType.COMMAND,
                    text: Form_control_node[the_locale],
                    arguments: {
                        turn: {
                            type: ArgumentType.STRING,
                            defaultValue: 'start',
                            menu: 'turn'
                        },
                        node_name: {
                            type: ArgumentType.STRING,
                            defaultValue: 'node_alphamini'
                        }
                    }
                },
                {
                    opcode: 'connect',
                    blockType: BlockType.COMMAND,
                    text: FormConnect[the_locale],
                    arguments: {
                        id: {
                            type: ArgumentType.STRING,
                            defaultValue: '00447'
                            //defaultValue: '192.168.1.13'
                        },
                        robot_type: {
                            type: ArgumentType.STRING,
                            defaultValue: 'DEDU',
                            menu: 'robot_type'
                        }
                    }
                },
                {
                  opcode: "disconnect",
                  blockType: BlockType.COMMAND,
                  text: FormDisConnect[the_locale]
                },
                {
                    opcode: 'move',
                    blockType: BlockType.COMMAND,
                    text: FormMove[the_locale],
                    arguments: {
                        step: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        direction: {
                            type: ArgumentType.STRING,
                            defaultValue: 'forward',
                            menu: 'direction'
                        }
                    }
                },
                // started
                {
                    opcode: 'leftright',
                    blockType: BlockType.COMMAND,
                    text: FormTurnLeftRight[the_locale],
                    arguments: {
                        step: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        direction: {
                            type: ArgumentType.STRING,
                            defaultValue: 'right',
                            menu: 'dir_leftright'
                        }
                    }
                },
                // ended
            //    {
            //        opcode: 'play_action',
            //        blockType: BlockType.COMMAND,
            //        text: FormPlayAction[the_locale],
            //        arguments: {
            //            name: {
            //                type: ArgumentType.NUMBER,
            //                defaultValue: '010' // 打招呼
            //            }
            //        }
            //    },
                {
                    opcode: 'newaction',
                    blockType: BlockType.COMMAND,
                    text: FormNewAction[the_locale],
                    arguments: {
                        name: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 'reposition',
                            menu: 'listaction'
                        }
                    }
                },

                //[started] added stop_action block by geraicerdas Aug 10,2022
          //      {
          //          opcode: 'stop_action',
          //          blockType: BlockType.COMMAND,
          //          text: FormStopAction[the_locale],
          //          arguments: {}
          //      },
                //
              //  {
              //      opcode: 'play_behavior',
              //      blockType: BlockType.COMMAND,
              //      text: FormPlayBehavior[the_locale],
              //      arguments: {
              //          name: {
              //              type: ArgumentType.STRING,
              //              defaultValue: 'custom_0035' // 生日快乐
              //          }
              //      }
              //  },
                {
                    opcode: 'newperform',
                    blockType: BlockType.COMMAND,
                    text: FormNewPerform[the_locale],
                    arguments: {
                        name: {
                            type: ArgumentType.STRING,
                            defaultValue: 'belch',
                            menu: 'listperform'
                        }
                    }
                },
                //[started] added stop_behavior block by geraicerdas Aug 10,2022
            //    {
            //        opcode: 'stop_behavior',
            //        blockType: BlockType.COMMAND,
            //        text: FormStopBehavior[the_locale],
            //        arguments: {}
            //    },
                //[ended] added stop_behavior block by geraicerdas Aug 10,2022
              {
                    opcode: 'say',
                    blockType: BlockType.COMMAND,
                    text: FormSay[the_locale],
                    arguments: {
                        x: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Hello, I am Alpha Mini'
                        }
                    }
                },
                // [started] added blocks by geraicerdas Aug 10,2022
            //    {
            //        opcode: 'play_sound',
            //        blockType: BlockType.COMMAND,
            //        text: FormPlaySound[the_locale],
            //        arguments: {
            //            name: {
            //                type: ArgumentType.STRING,
            //                defaultValue: 'read_016' //
            //            }
            //        }
            //    },
                {
                    opcode: 'newsound',
                    blockType: BlockType.COMMAND,
                    text: FormNewSound[the_locale],
                    arguments: {
                        name: {
                            type: ArgumentType.STRING,
                            defaultValue: 'elephant',
                            menu: 'listinternalsound'
                        }
                    }
                },
               // added online audio
                {
                    opcode: 'play_online_audio',
                    blockType: BlockType.COMMAND,
                    text: FormPlayOnlineAudio[the_locale],
                    arguments: {
                        url: {
                            type: ArgumentType.STRING,
                            defaultValue: 'https://audio.geraicerdas.com/senyum.mp3' //
                        }
                    }
                },
                //stop_audio
                {
                    opcode: 'stop_audio',
                    blockType: BlockType.COMMAND,
                    text: FormStopAudio[the_locale],
                    arguments: {}
                },
                // set volume
                {
                    opcode: 'setvolume',
                    blockType: BlockType.COMMAND,
                    text: FormSetVolume[the_locale],
                    arguments: {
                      value: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 100
                      }
                    }
                },
                {
                    opcode: 'playwikipedia',
                    blockType: BlockType.COMMAND,
                    text: FormPlayWikipedia[the_locale],
                    arguments: {
                      name: {
                        type: ArgumentType.STRING,
                        defaultValue: 'robot'
                      }
                    }
                },
                {
                    opcode: 'translate',
                    blockType: BlockType.COMMAND,
                    text: FormTranslate[the_locale],
                    arguments: {
                      text: {
                        type: ArgumentType.STRING,
                        defaultValue: 'human'
                      },
                      fr_lang: {
                        type:ArgumentType.STRING,
                        defaultValue: 'EN',
                        menu: 'fr_lang'
                      },
                      to_lang: {
                        type: ArgumentType.STRING,
                        defaultValue: 'CN',
                        menu: 'to_lang'
                      }
                    }
                },
                //
            //    {
            //        opcode: 'play_expression',
            //        blockType: BlockType.COMMAND,
            //        text: FormPlayExpression[the_locale],
            //        arguments: {
            //            name: {
            //                type: ArgumentType.STRING,
            //                defaultValue: 'codemao13' // 疑问
            //            }
            //        }
            //    },
                {
                    opcode: 'newexpression',
                    blockType: BlockType.COMMAND,
                    text: FormNewExpression[the_locale],
                    arguments: {
                        name: {
                            type: ArgumentType.STRING,
                            defaultValue: 'pry about',
                            menu: 'listexpression'
                        }
                    }
                },
                {
                    opcode: 'setmouthled',
                    blockType: BlockType.COMMAND,
                    text: FormSetMouthLed[the_locale],
                    arguments: {
                        color: {
                            type: ArgumentType.STRING,
                            defaultValue: 'green',
                            menu: 'color3'

                        },
                        duration: {
                            type: ArgumentType.NUMBER,
                            defaultValue: -1
                        }
                    }
                },
                {
                    opcode: 'blinkmouthled',
                    blockType: BlockType.COMMAND,
                    text: FormBlinkMouthLed[the_locale],
                    arguments: {
                        color: {
                            type: ArgumentType.STRING,
                            defaultValue: 'green',
                            menu: 'color3'

                        },
                        duration: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 3000
                        },
                        blinkdelay: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1000
                        }
                    }
                },
                {
                    opcode: 'turnled',
                    blockType: BlockType.COMMAND,
                    text: FormTurnLed[the_locale],
                    arguments: {
                        value: {
                            type: ArgumentType.STRING,
                            defaultValue: 'on',
                            menu: 'ledonoff'
                        }
                    }
                },
                {
                    opcode: 'get_infrared_distance',
                    blockType: BlockType.REPORTER,
                    text: FormGetInfraredDistance[the_locale],
                    arguments: {}
                },
                {
                    opcode: 'get_head_touch',
                    blockType: BlockType.REPORTER,
                    text: FormGetHeadTouch[the_locale],
                    arguments: {}
                },
                //
                {
                    opcode: 'get_face_count',
                    blockType: BlockType.REPORTER,
                    text: FormFaceDetectCount[the_locale],
                    arguments: {}
                },
                // face_analysis
                {
                    opcode: 'face_analysis',
                    blockType: BlockType.REPORTER,
                    text: FormFaceAnalysis[the_locale],
                    arguments: {}
                },
                {
                    opcode: 'face_recognise',
                    blockType: BlockType.REPORTER,
                    text: FormFaceRecognise[the_locale],
                    arguments: {}
                },

                //[ended] added stop_action block by geraicerdas Aug 10,2022
                {
                    opcode: 'stop_all',
                    blockType: BlockType.COMMAND,
                    text: FormStopAll[the_locale],
                    arguments: {
                      stop_type: {
                          type: ArgumentType.STRING,
                          defaultValue: 'sound',
                          menu: 'stop_type'
                      }
                    }
                },
                // [ended] added blocks by geraicerdas Aug 10,2022
                //
                {
                    opcode: 'broadcastTopicMessageAndWait',
                    blockType: BlockType.COMMAND,
                    text: Form_sendTopicMessageAndWait[the_locale],
                    arguments: {
                        content: {
                            type: ArgumentType.STRING,
                            defaultValue:
                                "robot.play_action(action_name='010')"
                        }
                    }
                },
                {
                    opcode: 'broadcastTopicMessageAndWait_REPORTER',
                    blockType: BlockType.REPORTER,
                    text: Form_sendTopicMessageAndWait_REPORTER[the_locale],
                    arguments: {
                        content: {
                            type: ArgumentType.STRING,
                            defaultValue: 'robot.GetActionList()'
                        }
                    }
                }
                /*
                {
                    opcode: "getbattery",
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        default: formatMessage({
                            id: "cxtello.actionMenu.getbattery",
                            default: "get battery",
                            description: "getbattery",
                        }),
                        description: "getbattery",
                    }),
                },*/
            ],
            menus: {
                turn: {
                    acceptReporters: true,
                    items: ['start', 'stop']
                },
                robot_type: {
                    acceptReporters: true,
                    items: ['DEDU', 'MINI']
                },
                direction: {
                    acceptReporters: true,
                    items: ['forward', 'backward']
                },
                // [started] added by geraicerdas Aug 10, 2022
                dir_leftright: {
                    acceptReporters: true,
                    items: ['right', 'left']
                },
                fr_lang: {
                  acceptReporters: true,
                  items: ['EN', 'CN']
                },
                to_lang: {
                  acceptReporters: true,
                  items: ['EN', 'CN']
                },
                color3: {
                  acceptReporters: true,
                  items: ['red', 'green', 'blue']
                },
                ledonoff: {
                  acceptReporters: true,
                  items: ['on', 'off']
                },
                listperform: {
                  acceptReporters: true,
                  items: ['belch', 'fart', 'strech your waist', 'sneeze',
                          'tickle', 'scare', 'healthy singing and dancing',
                          'shaolin hero dance', 'youth cultivation manual dance',
                          'little stars', 'grass dance', 'seaweed dance',
                          'i love bating', 'bugs fly', 'dura dance', 'buddist maiden',
                          '98k', 'shoot the gray dance', 'dance the bunch',
                          'little cute little tie', 'toca toca', 'learn to cat bark',
                          'happy birthday', 'tai chi']
                },
                listaction: {
                  acceptReporters: true,
                  items: ['reposition', 'push-up', 'golden rooster independent',
                          'yoga', 'cachinnation', 'embrace', 'sit down',
                          'get down', 'stoop', 'kung fu', 'raise your right leg',
                          'raise your left leg', 'raise your hands', 'welcome',
                          'nod', 'wave your left hand', 'wave your right hand',
                          'right lunge', 'shake ones head', 'crooked head',
                          'greet', 'shake hands', 'kiss', 'sell cute',
                          'sit up and stand up', 'invite', 'good bye', 'hugs',
                          'wow', 'thumbs up', 'ok', 'hey ya', 'whoops',
                          'pretend to fly', 'make a grimace', 'twist your ass',
                          'kill you', 'head scratching', 'dance_0003']
                },
                listexpression: {
                  acceptReporters: true,
                  items: ['pry out', 'sad', 'strech your waist sadly',
                          'fall asleep', 'frightened', 'sleepy', 'odd',
                          'astonished', 'sneeze', 'rouse', 'fight', 'push hard',
                          'doubt', 'awakening', 'distress', 'laugh', 'despressed',
                          'craving', 'love', 'blink', 'w-type movement',
                          'look to the right', 'look to the left', 'look up',
                          'look left and right', 'look up and down', 'smile',
                          'shy', 'smile 2', 'cover your face', 'dysphoria',
                          'wretched', 'shed tears', 'cry', 'hurt', 'rage',
                          'arrogant', 'supercilious', 'squeeze the', 'dizzy',
                          'idle', 'cruel', 'wit', 'cockfighting eyes',
                          'reading glasses', 'gold wire glasses', 'dance_0003']
                },
                listinternalsound: {
                  acceptReporters: true,
                  items: ['all decked out tonight', 'angry', 'anjian', 'bear',
                          'biansheng', 'bird', 'bridge', 'business freedom',
                          'cattle', 'chicken', 'complete', 'dianbo', 'dianhuahujiao',
                          'dog', 'elephant', 'eternity and more', 'fail', 'games',
                          'get', 'giraffe', 'happy', 'happy birthday to you',
                          'happy plifting', 'haqian', 'hores screamed',
                          'horse snout', 'hulu', 'jdi hyper', 'jiguang', 'jingche1',
                          'jingche2', 'jingle_bells2', 'jiqiren', 'jiuhuche',
                          'laidianlingsheng', 'lay it down', 'lion', 'maimeng',
                          'mangying', 'meimiashhunjian', 'mellow', 'menlin',
                          'merry christmas', 'monkey', 'move', 'qichelaba',
                          'qichelaba1', 'qicheyinging', 'rhinoceros', 'sealion',
                          'shiluo', 'surprice', 'tiger', 'walrus', 'xuangashunjian',
                          'yangjigae', 'yanhu', 'yinqing', 'yiwen', 'yiyu',
                          'yujianjiqi', 'yukuai', 'zhiyuan', 'zunming' ]
                },
                stop_type: {
                    acceptReporters: true,
                    items: ['sound', 'action', 'behavior']
                }
                // [ended] added by geraicerdas Aug 10, 2022
            }
        };
    }

    connect (args) {
        const id = args.id;
        const content = `robot.connect("${id}", "${args.robot_type}")`; // todo 兼容旧的
        return this.client.emit_with_messageid(NODE_ID, content); // timeout
    }
    say (args) {
        const x = args.x;
        const content = `robot.say(text="${x}")`;
        return this.client.emit_with_messageid(NODE_ID, content);
    }

    // 前方障碍物距离 get_infrared_distance
    get_infrared_distance (args) {
        const content = `robot.get_infrared_distance()`;
        return this.client.emit_with_messageid(NODE_ID, content);
    }

    get_head_touch (args) {
        const content = `robot.get_headtouch()`;
        return this.client.emit_with_messageid(NODE_ID, content);
    }

    get_face_count (args) {
        const content = `robot.face_detect()`;
        return this.client.emit_with_messageid(NODE_ID, content);
    }
    //
    face_analysis (args) {
        const content = `robot.face_analysis()`;
        return this.client.emit_with_messageid(NODE_ID, content);
    }

    face_recognise (args) {
        const content = `robot.face_recognise()`;
        return this.client.emit_with_messageid(NODE_ID, content);
    }

    move (args) {
        // step=1, direction="FORWARD"
        const step = args.step;
        const direction = args.direction;
        const content = `robot.move(${step}, "${direction}")`;
        return this.client.emit_with_messageid(NODE_ID, content);
    }

    play_behavior (args) {
        const name = args.name;
        const content = `robot.play_behavior(name='${name}')`;
        return this.client.emit_with_messageid(NODE_ID, content);
    }

    newperform (args) {
        name = args.name;
        if (name=='belch') name='w_stand_0001';
        else if (name=='fart') name='w_stand_0002';
        else if (name=='strech your waist') name='w_stand_0003';
        else if (name=='sneeze') name='w_stand_0008';
        else if (name=='tickle') name='w_stand_0009';
        else if (name=='scare') name='w_stand_0010';
        else if (name=='healthy singing and dancing') name='dance_0001';
        else if (name=='shaolin hero dance') name='dance_0002';
        else if (name=='youth cultivation manual dance') name='dance_0003';
        else if (name=='little stars') name='dance_0004';
        else if (name=='grass dance') name='dance_0005';
        else if (name=='seaweed dance') name='dance_0006';
        else if (name=='i love bating') name='dance_0007';
        else if (name=='bugs fly') name='dance_0008';
        else if (name=='dura dance') name='dance_0012';
        else if (name=='buddist maiden') name='dance_0013';
        else if (name=='98k') name='dance_0014';
        else if (name=='dance the bunch') name='dance_0015';
        else if (name=='little cute little tie') name='dance_0017';
        else if (name=='toca toca') name='dance_0018';
        else if (name=='learn to cat bark') name='dance_0009';
        else if (name=='happy birthday') name='custom_0035';
        else if (name=='tai chi') name='014';
        const content = `robot.play_behavior(name='${name}')`;
        return this.client.emit_with_messageid(NODE_ID, content);
    }

    play_action (args) {
        const name = args.name;
        const content = `robot.play_action(action_name='${name}')`;
        return this.client.emit_with_messageid(NODE_ID, content);
    }

    newaction (args) {
        name = args.name;
        if (name=='reposition') name='009';
        else if (name=='push-up') name='012';
        else if (name=='golden rooster independent') name='016';
        else if (name=='yoga') name='024';
        else if (name=='cachinnation') name='010';
        else if (name=='embrace') name='random_short2';
        else if (name=='sit down') name='027';
        else if (name=='get down') name='031';
        else if (name=='stoop') name='021';
        else if (name=='kung fu') name='013';
        else if (name=='raise your right leg') name='018';
        else if (name=='raise your left leg') name='019';
        else if (name=='raise your hands') name='017';
        else if (name=='welcome') name='015';
        else if (name=='nod') name='011';
        else if (name=='wave your left hand') name='random_short3';
        else if (name=='wave your right hand') name='random_short4';
        else if (name=='right lunge') name='028';
        else if (name=='shake ones head') name='037';
        else if (name=='crooked head') name='038';
        else if (name=='greet') name='Surveillance_001';
        else if (name=='shake hands') name='Surveillance_003';
        else if (name=='kiss') name='Surveillance_004';
        else if (name=='sell cute') name='Surveillance_006';
        else if (name=='sit up and stand up') name='007';
        else if (name=='invite') name='action_014';
        else if (name=='good bye') name='action_016';
        else if (name=='hugs') name='action_012';
        else if (name=='wow') name='action_004';
        else if (name=='thumbs up') name='action_005';
        else if (name=='ok') name='action_006';
        else if (name=='hey ya') name='action_018';
        else if (name=='whoops') name='action_020';
        else if (name=='pretend to fly') name='action_011';
        else if (name=='make a grimace') name='action_013';
        else if (name=='twist your ass') name='action_015';
        else if (name=='kill you') name='action_007';
        else if (name=='head scratching') name='action_019';
        else if (name=='dance_0003') name='dance_0003';

        const content = `robot.play_action(action_name='${name}')`;
        return this.client.emit_with_messageid(NODE_ID, content);
    }

    play_expression (args) {
        const name = args.name;
        const content = `robot.play_expression(express_name='${name}')`;
        return this.client.emit_with_messageid(NODE_ID, content);
    }

    newexpression (args) {
        name = args.name;
        if (name=='pry out') name='codemao1';
        else if (name=='sad') name='codemao2';
        else if (name=='strech your waist sadly') name='codemao3';
        else if (name=='fall asleep') name='codemao4';
        else if (name=='frightened') name='codemao5';
        else if (name=='sleepy') name='codemao6';
        else if (name=='odd') name='codemao7';
        else if (name=='astonished') name='codemao8';
        else if (name=='sneeze') name='codemao9';
        else if (name=='rouse') name='codemao10';
        else if (name=='fight') name='codemao11';
        else if (name=='push hard') name='codemao12';
        else if (name=='doubt') name='codemao13';
        else if (name=='awakening') name='codemao14';
        else if (name=='distress') name='codemao15';
        else if (name=='laugh') name='codemao16';
        else if (name=='despressed') name='codemao17';
        else if (name=='craving') name='codemao18';
        else if (name=='love') name='codemao19';
        else if (name=='blink') name='codemao20';
        else if (name=='w-type movement') name='w-basic_0007-1';
        else if (name=='look to the right') name='w-basic_0003-1';
        else if (name=='look to the left') name='w-basic_0005-1';
        else if (name=='look up') name='w-basic_0010-1';
        else if (name=='look left and right') name='w-basic_0011-1';
        else if (name=='look up and down') name='w-basic_0012-1';
        else if (name=='smile') name='emo_007';
        else if (name=='shy') name='emo_010';
        else if (name=='smile 2') name='emo_016';
        else if (name=='cover your face') name='emo_028';
        else if (name=='dysphoria') name='emo_008';
        else if (name=='wretched') name='emo_014';
        else if (name=='shed tears') name='emo_009';
        else if (name=='cry') name='emo_011';
        else if (name=='hurt') name='emo_023';
        else if (name=='rage') name='emo_013';
        else if (name=='arrogant') name='emo_015';
        else if (name=='supercilious') name='emo_026';
        else if (name=='squeeze the') name='emo_022';
        else if (name=='dizzy') name='emo_019';
        else if (name=='idle') name='emo_020';
        else if (name=='cruel') name='emo_027';
        else if (name=='wit') name='emo_029';
        else if (name=='cockfighting eyes') name='emo_030';
        else if (name=='reading glasses') name='emo_031';
        else if (name=='gold wire glasses') name='emo_032';
        else if (name=='dance_0003') name='dance_0003';

        const content = `robot.play_expression(express_name='${name}')`;
        return this.client.emit_with_messageid(NODE_ID, content);
    }

    // [started] added by geraicerdas Aug 10, 2022
    disconnect () {
      const content = `robot.disconnect()`;
      return this.client.emit_with_messageid(NODE_ID, content);
    }

    leftright (args) {
        // step=1, direction="LEFTWARD"
        const step = args.step;
        const direction = args.direction;
        const content = `robot.move(${step}, "${direction}ward")`;
        return this.client.emit_with_messageid(NODE_ID, content);
    }

    play_sound (args) {
        const filename = args.name;
        const content = `robot.play_sound(url='${filename}')`;
        return this.client.emit_with_messageid(NODE_ID, content);
    }

    newsound (args) {
        filename = args.name;
        if (filename=='all decked out tonight') filename='BCM_all_decked_out_tonight';
        else if (filename=='angry') filename='BCM_angry';
        else if (filename=='anjian') filename='BCM_anjian';
        else if (filename=='bear') filename='BCM_bear';
        else if (filename=='biansheng') filename='BCM_biansheng';
        else if (filename=='bird') filename='BCM_bird';
        else if (filename=='bridge') filename='BCM_bridge';
        else if (filename=='business freedom') filename='BCM_business_freedom';
        else if (filename=='cattle') filename='BCM_Cattle';
        else if (filename=='chicken') filename='BCM_chicken';
        else if (filename=='complete') filename='BCM_complete';
        else if (filename=='dianbo') filename='BCM_dianbo';
        else if (filename=='dianhuahujiao') filename='BCM_dianhuahujiao';
        else if (filename=='dog') filename='BCM_dog';
        else if (filename=='elephant') filename='BCM_Elephant';
        else if (filename=='eternity and more') filename='BCM_eternity_and_more';
        else if (filename=='fail') filename='BCM_fail';
        else if (filename=='games') filename='BCM_games';
        else if (filename=='get') filename='BCM_get';
        else if (filename=='giraffe') filename='BCM_bianshengiraffe';
        else if (filename=='happy') filename='BCM_happy';
        else if (filename=='happy birthday to you') filename='BCM_happy_birthday_to_you';
        else if (filename=='happy plifting') filename='BCM_happy plifting';
        else if (filename=='haqian') filename='BCM_haqian';
        else if (filename=='hores screamed') filename='BCM_hores_screamed';
        else if (filename=='horse snout') filename='BCM_Horse_snout';
        else if (filename=='hulu') filename='BCM_hulu';
        else if (filename=='jdi hyper') filename='BCM_jdi hyper';
        else if (filename=='jiguang') filename='BCM_jiguang';
        else if (filename=='jingche1') filename='BCM_jingche1';
        else if (filename=='jingche2') filename='BCM_jingche2';
        else if (filename=='jingle_bells2') filename='BCM_jingle_bells2';
        else if (filename=='jiqiren') filename='BCM_jiqiren';
        else if (filename=='jiuhuche') filename='BCM_jiuhuche';
        else if (filename=='laidianlingsheng') filename='BCM_laidianlingsheng';
        else if (filename=='lay it down') filename='BCM_lay_it_down';
        else if (filename=='lion') filename='BCM_lion';
        else if (filename=='maimeng') filename='BCM_maimeng';
        else if (filename=='mangying') filename='BCM_mangying';
        else if (filename=='meimiashhunjian') filename='BCM_meimiashhunjian';
        else if (filename=='mellow') filename='BCM_mellow';
        else if (filename=='menlin') filename='BCM_menlin';
        else if (filename=='merry christmas') filename='BCM_merry christmas';
        else if (filename=='monkey') filename='BCM_monkey';
        else if (filename=='move') filename='BCM_move';
        else if (filename=='qichelaba') filename='BCM_qichelaba';
        else if (filename=='qichelaba1') filename='BCM_qichelaba1';
        else if (filename=='qicheyinging') filename='BCM_qicheyinging';
        else if (filename=='rhinoceros') filename='BCM_rhinoceros';
        else if (filename=='sealion') filename='BCM_sealion';
        else if (filename=='shiluo') filename='BCM_shiluo';
        else if (filename=='surprice') filename='BCM_surprice';
        else if (filename=='tiger') filename='BCM_tiger';
        else if (filename=='walrus') filename='BCM_walrus';
        else if (filename=='xuangashunjian') filename='BCM_xuangashunjian';
        else if (filename=='yangjigae') filename='BCM_yangjigae';
        else if (filename=='yanhu') filename='BCM_yanhu';
        else if (filename=='yinqing') filename='BCM_yinqing';
        else if (filename=='yiwen') filename='BCM_yiwen';
        else if (filename=='yiyu') filename='BCM_yiyu';
        else if (filename=='yujianjiqi') filename='BCM_yujianjiqi';
        else if (filename=='yukuai') filename='BCM_yukuai';
        else if (filename=='zhiyuan') filename='BCM_zhiyuan';
        else if (filename=='zunming') filename='BCM_zunming';

        const content = `robot.play_sound(url='${filename}')`;
        return this.client.emit_with_messageid(NODE_ID, content);
    }

    play_online_audio (args) {
        const url = args.url;
        const content = `robot.play_online_audio(url='${url}')`;
        return this.client.emit_with_messageid(NODE_ID, content);
    }

    stop_audio () {
        const content = `robot.stop_audio()`;
        return this.client.emit_with_messageid(NODE_ID, content);
    }

    setvolume (args) {
        const vol = args.value;
        const content = `robot.setvolume(volume='${vol}')`;
        return this.client.emit_with_messageid(NODE_ID, content);
    }

    playwikipedia (args) {
        const name = args.name;
        const content = `robot.playwikipedia(query='${name}')`;
        return this.client.emit_with_messageid(NODE_ID, content);
    }

    translate (args) {
        const text = args.text;
        const fr_lang = args.fr_lang;
        const to_lang = args.to_lang;
        const content = `robot.translate(query='${text}', from_lan='${fr_lang}', to_lan='${to_lang}')`;
        return this.client.emit_with_messageid(NODE_ID, content);
    }

    setmouthled (args) {
        const col = args.color;
        const dur = args.duration;
        const content = `robot.set_mouth_led(color='${col}', duration=${dur})`;
        return this.client.emit_with_messageid(NODE_ID, content);
    }

    blinkmouthled (args) {
        const col = args.color;
        const dur = args.duration;
        const delay = args.blinkdelay;
        const content = `robot.blink_mouth_led(color='${col}', duration=${dur}, breathduration=${delay})`;
        return this.client.emit_with_messageid(NODE_ID, content);
    }

    turnled (args) {
        const value = args.value;
        const content = `robot.turn_mouth_led(is_open='${value}')`;
        return this.client.emit_with_messageid(NODE_ID, content);
    }

    stop_behavior () {
        const content = `robot.stop_behavior()`;
        return this.client.emit_with_messageid(NODE_ID, content);
    }

    stop_action () {
        const content = `robot.stop_action()`;
        return this.client.emit_with_messageid(NODE_ID, content);
    }

    stop_all (args) {
      //  const content = null;
      //  switch (args.stop_type) {
      //    case 'audio' : content = `robot.stop_audio()`;
      //    case 'behavior' : content = `robot.stop_behavior()`;
      //    case 'action' : content = `robot.stop_action()`;
      //  }
      //switch (args.stop_type) {
      //  case 'sound' : this.stop_audio();
      //  case 'behavior' : this.stop_behavior();
      //  case 'action' : this.stop_action();
      //}
      if (args.stop_type == 'sound') this.stop_audio();
      else if (args.stop_type == 'behavior') this.stop_behavior();
      else if (args.stop_type == 'action') this.stop_action();
      console.log(args.stop_type);
        //return this.client.emit_with_messageid(NODE_ID, content);
    }
    // [ended] added by geraicerdas Aug 10, 2022

    // broadcast
    broadcastTopicMessageAndWait (args) {
        const node_id = args.node_id;
        const content = args.content;
        return this.client.emit_with_messageid(node_id, content);
    }

    getbattery () {
        return this.client.emit_with_messageid(NODE_ID, 'tello.get_battery()');
    }

    open_help_url (args) {
        window.open(HELP_URL);
    }

    control_node (args) {
        const content = args.turn;
        const node_name = args.node_name;
        return this.client.adapter_base_client.emit_with_messageid_for_control(
            NODE_ID,
            content,
            node_name,
            'node'
        );
    }

    set_emit_timeout (args) {
        const timeout = parseFloat(args.emit_timeout) * 1000;
        this.client.emit_timeout = timeout;
    }

    broadcastTopicMessageAndWait (args) {
        // topic服务于消息功能， node_id承载业务逻辑(extension)
        const content = args.content;
        return this.client.adapter_base_client.emit_with_messageid(
            NODE_ID,
            content
        );
    }

    broadcastTopicMessageAndWait_REPORTER (args) {
        // topic服务于消息功能， node_id承载业务逻辑(extension)
        const content = args.content;
        return this.client.adapter_base_client.emit_with_messageid(
            NODE_ID,
            content
        );
    }
}

module.exports = Scratch3AlphaminiBlocks;
