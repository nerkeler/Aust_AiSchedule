function scheduleHtmlParser(html) {
    //除函数名外都可编辑
    //传入的参数为上一步函数获取到的html
    //可使用正则匹配
    //可使用解析dom匹配，工具内置了$，跟jquery使用方法一样，直接用就可以了，参考：https://juejin.im/post/5ea131f76fb9a03c8122d6b9
    //以下为示例，您可以完全重写或在此基础上更改


    var result = new Array();    
    var week_num = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]
    //var weekend = ["星期一","星期二","星期三","星期四","星期五","星期六","星期天"]
    var flag = 1;
    var x = 1;
     const startTime=['08:00',"09:55","10:00","10:55","14:00","14:55",
                    "16:00","16:55","17:40","19:00","19:55","21:10"]
    const endTime=["08:45","09:40","10:45","11:40","14:45","15:40"
                    ,"16:45","17:40","19:45","20:40","21:00","21:40"]
    // var tilte = $("document.querySelector("#TD0_0")")
    $("#manualArrangeCourseTable tbody  ").children().each(function () {
        y = 1;
        if (flag % 2 == 1) {
            $(this).children().each(function () {
                flags = $(this);
                //console.log(flags);
                //console.log(flags.attr("id"));
                if (flags.attr("id")) {
                    var classNum = flags.attr("title");
                    //console.log(typeof(classNum)=="undefined");
                    if (typeof (classNum) != "undefined") {


                        var reg = new RegExp(';', "g");
                        var classNum = classNum.replace(reg, '') // 移除字符串中的所有()括号（包括其内容）
                        var classNum = classNum.split(" ");

                        var name = classNum[0];
                        var r = /[0-9]{1,2}-[0-9]{1,2}/g;
                        var weeks = classNum[1].match(r)[0];
                        var numSum = weeks.split("-");
                        //console.log(numSum);
                        var first =parseInt(numSum[0]) ;
                        var last = parseInt(numSum[1]);
                        
                        //console.log(weeks);
                        var teachers = classNum[1];
                        teachers = teachers.replace(")", " ");
                        teachers = teachers.split(" ");
                        var teacher = teachers[0].replace("(", "");
                        var position = teachers[1].replace("(" + weeks + ",", "");
                        position = position.replace(")", "");

                        if (classNum.length == 3) {
                            var position = teachers[1].replace("(" + weeks + ",", "");
                            position = position.replace(")", " ");
                            position = position.split(" ")
                            //console.log("特殊情况：")
                            //console.log(position[0]);
                            var name2 = position[1];                            
                            var teachers = classNum[2];
                            teachers = teachers.replace(")", " ");
                            teachers = teachers.split(" ");
                            var teacher2 = teachers[0].replace("(", "");                           
                            var r = /[0-9]{1,2}-[0-9]{1,2}/g;
                            var weeks2 = classNum[2].match(r)[0]; 
                             var numSum2 = weeks2.split("-");
                             var first2 =parseInt(numSum2[0]) ;
                            var last2 = parseInt(numSum2[1]);                          
                            var position2 = teachers[1].replace("(" + weeks2 + ",", "");
                            position2 = position2.replace(")", "");                            
                            //console.log(x, y);

                            // console.log(classNum);
                            var obj = {
                                name: name,
                                position: position,
                                teacher: teacher,
                                weeks:week_num.slice(first-1,last),
                                day: y,
                                sections: [
                                    {"section": 2 * x - 1,},
                                    {"section": 2 * x,},
                                    {"section": 2 * x + 1,},

                                ],
                            };
                            var obj1 = {
                                name: name2,
                                position: position2,
                                teacher: teacher2,
                                weeks: week_num.slice(first2-1,last2),
                                day: y,
                                sections: [
                                    {"section": 2 * x - 1,},
                                    {"section": 2 * x,},
                                    {"section": 2 * x + 1,},

                                ],

                            };
                            result.push(obj);
                            result.push(obj1);
                        } else {

                            var obj = {
                                name: name,
                                position: position,
                                teacher: teacher,
                                weeks:week_num.slice(first-1,last),                   
                   
                               day:y,
                                sections: [
                                    {"section": 2 * x - 1,},
                                    {"section": 2 * x,},
                                    {"section": 2 * x + 1,},

                                ],
                            }
                            result.push(obj);
                        }

                    } else {                       
                        //console.log(classNum);
                    }
                    y += 1;
                };
            });
            x += 1;
        }

       flag += 1;

    }
    );
     var sectionTime= [
      {
        "section": 1,
        "startTime": startTime[0],
        "endTime": endTime[0]
      },
      {
        "section": 2,
        "startTime": startTime[1],
        "endTime": endTime[1]
      },
      {
        "section": 3,
        "startTime": startTime[2],
        "endTime": endTime[2]
      },
      {
        "section": 4,
        "startTime": startTime[3],
        "endTime": endTime[3]
      },
      {
        "section": 5,
        "startTime": startTime[4],
        "endTime": endTime[4]
      },
      {
        "section": 6,
        "startTime": startTime[5],
        "endTime": endTime[5]
      },
      {
        "section": 7,
        "startTime": startTime[6],
        "endTime": endTime[6]
      },
      {
        "section": 8,
        "startTime": startTime[7],
        "endTime": endTime[7]
      },
      {
        "section": 9,
        "startTime": startTime[8],
        "endTime": endTime[8]
      },
      {
        "section": 10,
        "startTime": startTime[9],
        "endTime": endTime[9]
      },
      {
        "section": 11,
        "startTime": startTime[10],
        "endTime": endTime[10]
      },
      {
        "section": 12,
        "startTime": startTime[11],
        "endTime": endTime[11]
      },];
// console.log(result);
   return { "courseInfos": result, "sectionTimes":sectionTime,}
}