(function( $ ){
    $.fn.horloge = function(size, options) {
      
        var getArray = function (begin, end, step, not) {
          if (!step) step = 1;
          var array = [];
          if (begin <= end) {
            for (var i = begin; i <= end; i += step) {
              if (($.inArray(i, not))) {
                array.push(i);
              }
            };
          } else {
            for (var i = begin; i >= end; i -= step) {
              if (($.inArray(i, not))) {
                array.push(i);
              }
            };
          }

          return array;
        };

        var width = size + 'px';
        var height = parseInt(size/2) + 'px';

        var months = ['JANVIER', 'FEVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN', 'JUILLET', 'AOUT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DECEMBRE'];
        var years = getArray(2014, 2010, 1);
        var hours = getArray(0, 23);
        var minutes = getArray(0, 59, 5);
        for (var i = 0; i < hours.length; i++) {
          hours[i] = hours[i] < 10 ? '0' + hours[i] : hours[i];
        };
        
        for (var i = 0; i < minutes.length; i++) {
          minutes[i] = minutes[i] < 10 ? '0' + minutes[i] : minutes[i];
        };
        

        var that = $(this);

         var dating = function() {
            var date;
            if(options.date != null) {
               var dateFirstSplit = options.date.split(' ');
               var dateArray = dateFirstSplit[0].split('-');
               var hourArray = dateFirstSplit[1].split(':');
               date = new Date(dateArray[0], (dateArray[1] - 1), dateArray[2], hourArray[0], hourArray[1]);
               console.log(dateFirstSplit);
            } else {
               date = new Date();
            }

            return date;
         };

         var construct = function(date) {
            mois = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
            jour = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            heure = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
            minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

            var horloge = '<div class="horloge">';
                    horloge += '<div class="fond">';
                        horloge += '<div class="heure">';
                            
                            // Edit Hour
                            horloge += '<div class="changeHour">';
                                horloge += '<div class="arrow-up"></div>';
                                horloge += '<div class="arrow-down"></div>';
                            horloge += '</div>';
                            // Edit Hour and minutes
                            horloge += '<div class="changeMin">';
                                horloge += '<div class="arrow-up"></div>';
                                horloge += '<div class="arrow-down"></div>';
                            horloge += '</div>';


                            horloge += '<div class="block">';
                                horloge += '<div class="left">';
                                    horloge += '<div class="top"><span><span>' + heure + '</span></span></div>';
                                    horloge += '<div class="bottom"><span><span>' + heure + '</span></span></div>';                              
                                horloge += '</div>';
                                horloge += '<div class="right">';
                                    horloge += '<div class="top"><span>' + minute + '</span></div>';
                                    horloge += '<div class="bottom"><span>' + minute + '</span></div>';
                                horloge += '</div>';
                          
                            horloge += '</div>';
                        horloge += '</div>';
                        horloge += '<div class="date">';
                            horloge += '<div class="block">';
                                horloge += '<div class="weekBlock">';
                                    horloge += '<ul class="week">';
                                        horloge += '<li>LUN</li><li>MAR</li><li>MER</li><li>JEU</li><li>VEN</li><li>SAM</li><li>DIM</li>';
                                    horloge += '</ul>';


                                    // Edit week
                                    horloge += '<div class="arrow-left"></div>';
                                    horloge += '<div class="arrow-right"></div>';

                                horloge += '</div>';
                            horloge += '<div class="dateBlock">';
                                horloge += '<div class="jour"><span>' + jour + '</span></div>';
                                horloge += '<div class="mois"><span>' + mois + '</span></div>';
                                horloge += '<div class="annee"><span>' + date.getFullYear() + '</span></div>';
                            horloge += '</div>';
                        horloge += '</div>';
                    horloge += '</div>';

                    // Icons
                    horloge += '<div class="icon-calendar"></div>';
                    horloge += '<div class="icon-clock"></div>';



                horloge += '</div>';
            horloge += '</div>';

            that.append(horloge);
            arrow('left', that.find('.horloge .arrow-left'));
            arrow('right', that.find('.horloge .arrow-right'));
            arrow('up', that.find('.horloge .arrow-up'));
            arrow('down', that.find('.horloge .arrow-down'));

            var iconSize = parseInt(size * 32 / 400);
            console.log(iconSize);
            // Creation icones
            icon(that.find('.icon-calendar'), 'calendar', iconSize, '#dddddd');
            icon(that.find('.icon-clock'), 'clock', iconSize, '#dddddd');
            $('.icon-calendar').hover(function() {
                $(this).empty();
                icon($(this), 'calendar', iconSize, 'rgb(0,153,255)');
            }, function() {
                $(this).empty();
                icon($(this), 'calendar', iconSize, '#dddddd');
            });
            $('.icon-clock').hover(function() {
                $(this).empty();
                icon($(this), 'clock', iconSize, 'rgb(0,153,255)');
            }, function() {
                $(this).empty();
                icon($(this), 'clock', iconSize, '#dddddd');
            });





        };

        var addCss = function(date) {
            that.find('.horloge').css( {
               position:'relative',
               margin: (size/4) + 'px auto',
               width: width,
               height: height,
               background: 'linear-gradient(to bottom, #666666, #333333)', 
               borderRadius: parseInt(size * 10 / 400) + 'px',
               cursor: 'default'
            });

            that.find('.horloge .fond').css( {
               position:'absolute',
               top: parseInt(size * 3 / 400) + 'px',
               left: parseInt(size * 3 / 400) + 'px',
               width: 'calc(100% - ' + parseInt(size * 6 / 400) + 'px)',
               height: 'calc(100% - ' + parseInt(size * 6 / 400) + 'px)',
               background: 'linear-gradient(to bottom, rgb(30, 30, 25), rgb(150, 150, 160))', 
               borderRadius: parseInt(size * 10 / 400) + 'px'
            });

            that.find('.horloge .heure').css( {
               position:'absolute',
               top:'-15%',
               left:'0',
               width:'100%',
               height:'75%'
            });

            that.find('.horloge .heure .block').css( {
               width:'85%',
               height:'100%',
               margin:'0 auto'
            });

            that.find('.horloge .heure .block > div').css( {
               position:'relative',
               width:'46%',
               height:'100%',
               background:'linear-gradient(to bottom, #cccccc, #333333)', 
               borderRadius: parseInt(size * 7 / 400) + 'px'
            });

            that.find('.horloge .heure .block .left').css( {
               float:'left'
            });

            that.find('.horloge .heure .block .right').css( {
               float:'right'
            });

            that.find('.horloge .heure .block > div > div').css( {
               position:'absolute',
               left: parseInt(size * 3 / 400) + 'px',
               width:'calc(100% - ' + parseInt(size * 6 / 400) + 'px)',
               height:'calc(50% - ' + parseInt(size * 5 / 400) + 'px)',
               overflow: 'hidden',
               textAlign: 'center',
               fontSize: parseInt(size * 130 / 400) + 'px'
            });

            that.find('.horloge .heure .block .top').css( {
               top:parseInt(size * 3 / 400) + 'px',
               background:'linear-gradient(to bottom, #dddddd 0%, #eeeeee 25%, #ffffff 100%)', 
               borderTopLeftRadius: parseInt(size * 6 / 400) + 'px',
               borderTopRightRadius: parseInt(size * 6 / 400) + 'px'
            });

            that.find('.horloge .heure .block .bottom').css( {
               bottom:parseInt(size * 3 / 400) + 'px',
               background:'linear-gradient(to top, #dddddd 0%, #eeeeee 25%, #ffffff 100%)',
               borderBottomLeftRadius: parseInt(size * 6 / 400) + 'px',
               borderBottomRightRadius: parseInt(size * 6 / 400) + 'px'
            });

            that.find('.horloge .heure .block .top > span').css( {
               display:'inline-block',
               position:'absolute',
               width:'100%',
               top: parseInt(size * 14 / 400) + 'px',
               left:'0',
               textAlign: 'center'
            });

            that.find('.horloge .heure .block .bottom > span').css( {
               display:'inline-block',
               position:'absolute',
               width:'100%',
               bottom: '-' + parseInt(size * 3 / 400) + 'px',
               left:'0',
               textAlign: 'center'
            });

            that.find('.horloge .date').css( {
               position:'absolute',
               top:'62.5%',
               left:'0',
               width:'100%',
               height:'20%'
            });

            that.find('.horloge .date .block').css( {
               position: 'relative',
               width:'100%',
               height:'100%',
               margin:'0 auto'
            });

            that.find('.horloge .date .block .weekBlock').css( {
               fontSize:parseInt(size * 20 / 400) + 'px',
               color:'#cccccc'
            });

            that.find('.horloge .date .block .weekBlock ul').css( {
               textAlign: 'center',
               marginBottom: parseInt(size * 2 / 400) + 'px'
            });

            that.find('.horloge .date .block .weekBlock ul li').css( {
               display: 'inline-block',
               margin:'0 ' + parseInt(size * 3 / 400) + 'px'
            });

            var weekDay = date.getDay() -1; 
            that.find('.week li').eq(weekDay).css({color:'#333333'});   

            that.find('.horloge .date .block .dateBlock').css( {
               position: 'relative',
               width:'60%',
               height:'100%',
               margin:'0 auto',
               background: 'linear-gradient(to bottom, #cccccc, #333333)', 
               borderRadius: parseInt(size * 100 / 400) + 'px',
               fontSize:parseInt(size * 35 / 400) + 'px'
            });

            that.find('.horloge .date .block .dateBlock .jour').css( {
               position:'absolute',
               top:parseInt(size * 3 / 400) + 'px',
               left:parseInt(size * 3 / 400) + 'px',
               width: 'calc(28% - ' + parseInt(size * 5 / 400) + 'px)',
               height: 'calc(100% - ' + parseInt(size * 6 / 400) + 'px)',
               background: 'linear-gradient(to top, #dddddd 0%, #eeeeee 25%, #ffffff 100%)',
               borderTopLeftRadius: parseInt(size * 100 / 400) + 'px',
               borderBottomLeftRadius: parseInt(size * 100 / 400) + 'px',
               textAlign: 'center'
            });

            that.find('.horloge .date .block .dateBlock .mois').css( {
               position:'absolute',
               top:parseInt(size * 3 / 400) + 'px',
               left:'calc(28% + ' + parseInt(size * 2 / 400) + 'px)',
               width: 'calc(25% - ' + parseInt(size * 4 / 400) + 'px)',
               height: 'calc(100% - ' + parseInt(size * 6 / 400) + 'px)',
               background: 'linear-gradient(to top, #dddddd 0%, #eeeeee 25%, #ffffff 100%)',
               textAlign: 'center'
            });

            that.find('.horloge .date .block .dateBlock .annee').css( {
               position:'absolute',
               top:parseInt(size * 3 / 400) + 'px',
               left:'calc(53% + ' + parseInt(size * 2 / 400) + 'px)',
               width: 'calc(47% - ' + parseInt(size * 5 / 400) + 'px)',
               height: 'calc(100% - ' + parseInt(size * 6 / 400) + 'px)',
               background: 'linear-gradient(to top, #dddddd 0%, #eeeeee 25%, #ffffff 100%)',
               borderTopRightRadius: parseInt(size * 100 / 400) + 'px',
               borderBottomRightRadius: parseInt(size * 100 / 400) + 'px',
               textAlign: 'center'
            });

            that.find('.horloge .date .block .dateBlock > div > span').css( {
               display:'inline-block',
               position:'absolute',
               top:parseInt(size * 2 / 400) + 'px'
            });

            that.find('.horloge .date .block .dateBlock .jour span').css( {
               right:parseInt(size * 8 / 400) + 'px'
            });

            that.find('.horloge .date .block .dateBlock .mois span').css( {
               right:parseInt(size * 8 / 400) + 'px'
            });

            that.find('.horloge .date .block .dateBlock .annee span').css( {
               left:parseInt(size * 8 / 400) + 'px'
            });
       };

         var refresh = function(newDate) {
            that.empty();
            construct(newDate);
            addCss(newDate);
            
            if(options.setter == true) {
               setter(newDate);
            }
         }

        var active = function() {
            var now = new Date();
            var annee = now.getFullYear();
            var mois = now.getMonth() +1;
            var jour = now.getDate();
            var heure = now.getHours();
            var minute = now.getMinutes();
            var weekDay = now.getDay() -1;

            mois = mois < 10 ? '0' + mois : mois;
            jour = jour < 10 ? '0' + jour : jour;
            heure = heure < 10 ? '0' + heure : heure;
            minute = minute < 10 ? '0' + minute : minute;

                that.find('.annee span').text(annee);           
                that.find('.mois span').text(mois);         
                that.find('.jour span').text(jour);         

                that.find('.left span').text(heure);            
                that.find('.right span').text(minute);  
                that.find('.week li').css({color:'#cccccc'});       
                that.find('.week li').eq(weekDay).css({color:'#333333'});       
        };

        var setter = function(date) {
            // Week action
            var weekColor = '';
            var weekDay = (date.getDay() == 0) ? date.getDay() + 6 : date.getDay()  - 1 ;
            that.find('.horloge .date .block .weekBlock ul li').css( {
               cursor: 'pointer'
            }).hover(
               function() {
                  weekColor = $(this).css('color');
                  $(this).css({color: 'rgb(0,153,255)'});
               }, 
               function() {
                  $(this).css({color: weekColor});
               }
            ).on('click', function() {
               var difference = ($(this).index()) - weekDay;
               var startDay = new Date(that.find('.annee').text(), that.find('.mois').text() - 1, that.find('.jour').text());
              
               var newDay = startDay.getDate() + difference;
               startDay.setDate(newDay);
               refresh(startDay);

            });

            $('.icon-calendar').click(function(){
                that.find('.horloge').append(datePicker(date));
                backgroundCss($('.horloge .datePicker .cache'));
                $('.horloge .datePicker .cache').show();
                changeInputSelectDatePicker();

                arrow('left', that.find('.horloge .arrow-left'));
                arrow('right', that.find('.horloge .arrow-right'));
                arrow('up', that.find('.horloge .arrow-up'));
                arrow('down', that.find('.horloge .arrow-down'));

                that.on('click', 'tbody td:not(.disabled, .exit)', function(){
                  that.find('td').removeClass('selected');
                  $(this).addClass('selected');
                  that.find('.dateBlock .jour span').text($(this).text());
                  var eq = $(this).index();console.log(eq);
                  that.find('.horloge .date .block .weekBlock ul li').css({color:'#cccccc'});
                  that.find('.week li').eq(eq).css({color:'#333333'});
                });

                that.on('click', 'tbody td.exit, .datePicker > .cache', function(){
                  that.find('.datePicker').remove();
                  
                });

            });

            that.find('.weekBlock .arrow-left').click(function() {
              var startDay = new Date(that.find('.annee').text(), that.find('.mois').text() - 1, that.find('.jour').text());
              var sub1Week = new Date(startDay.getTime() - (1000 * 60 * 60 * 24 * 7));
              that.find('.annee span').text(sub1Week.getFullYear());
              that.find('.mois span').text((sub1Week.getMonth() + 1) <10 ? '0' + (sub1Week.getMonth() + 1) : (sub1Week.getMonth() + 1));
              that.find('.jour span').text(sub1Week.getDate() <10 ? '0' + sub1Week.getDate() : sub1Week.getDate());
            });

            that.find('.weekBlock .arrow-right').click(function() {
              var startDay = new Date(that.find('.annee').text(), that.find('.mois').text() - 1, that.find('.jour').text());
              var add1Week = new Date(startDay.getTime() + (1000 * 60 * 60 * 24 * 7));
              that.find('.annee span').text(add1Week.getFullYear());
              that.find('.mois span').text((add1Week.getMonth() + 1) <10 ? '0' + (add1Week.getMonth() + 1) : (add1Week.getMonth() + 1));
              that.find('.jour span').text(add1Week.getDate() <10 ? '0' + add1Week.getDate() : add1Week.getDate());
            });

            that.find('.changeHour .arrow-up').click(function() {
              var oldHour = that.find('.heure .block .left .top span span').text();
              var newHour = oldHour >= 23 ? '00' : (parseInt(oldHour) < 9 ? '0' + (parseInt(oldHour) + 1) : parseInt(oldHour) + 1) ;
              that.find('.heure .block .left .top span span, .heure .block .left .bottom span span').text(newHour);
            });

            that.find('.changeHour .arrow-down').click(function() {
              var oldHour = that.find('.heure .block .left .top span span').text();
              var newHour = parseInt(oldHour) <= 0 ? '23' : (parseInt(oldHour) < 11 ? '0' + (parseInt(oldHour) - 1) : parseInt(oldHour) - 1) ;
              that.find('.heure .block .left .top span span, .heure .block .left .bottom span span').text(newHour);
            });

            that.find('.changeMin .arrow-up').click(function() {
              var oldHour = that.find('.heure .block .right .top span').text();
              var newHour = oldHour >= 59 ? '00' : (parseInt(oldHour) < 9 ? '0' + (parseInt(oldHour) + 1) : parseInt(oldHour) + 1) ;
              that.find('.heure .block .right .top span, .heure .block .right .bottom span').text(newHour);
            });

            that.find('.changeMin .arrow-down').click(function() {
              var oldHour = that.find('.heure .block .right .top span').text();
              var newHour = parseInt(oldHour) <= 0 ? '59' : (parseInt(oldHour) < 11 ? '0' + (parseInt(oldHour) - 1) : parseInt(oldHour) - 1) ;
              that.find('.heure .block .right .top span, .heure .block .right .bottom span').text(newHour);
            });

            $('.icon-clock').click(function(){
              var selectTime = '<div class="timer">';
                    selectTime += '<div class="cache"></div>';
                    selectTime += '<div class="setTimer">';
                      selectTime += '<div><div class="select selectHour">00</div></div><span>H </span>';
                      selectTime += '<div><div class="select selectMinutes">00</div></div><span>min</span>';
                    selectTime += '</div>';
                  selectTime += '</div>';
             
              that.find('.horloge').append(selectTime);
              backgroundCss($('.horloge .timer > .cache'));
              that.find('.horloge .timer > .cache').show();
              fakeInputSelect( that.find('.selectHour'), hours );
              fakeInputSelect( that.find('.selectMinutes'), minutes );

            that.find( ".select .selected" ).bind('click', function( eventClick ){
              var parent = $(this).parents('.select');
              parent.find("*").css({zIndex:'150'});
              parent.find(".front, .cache, ul").show();
              var mousePositionStart = eventClick.pageY;
              var mousePositionEnd = eventClick.pageY + parent.find('ul').height() - parent.find('.selected').height() + 5;
              var sizeMouseMove = mousePositionEnd - mousePositionStart;
              var lengthList = (parent.find('ul li')).length;

              parent.mousemove(function( event ) {
                var mousePositionNow = event.pageY;
                if (mousePositionNow > mousePositionStart && mousePositionNow < mousePositionEnd) {
                  var diff = mousePositionNow - mousePositionStart;
                  parent.find('ul').css({top: '-' + diff + 'px' });

                  var pos = parseInt(diff * lengthList / sizeMouseMove);
                  var selection = parent.find('ul li').eq(pos).text();
                  parent.find('.selected').html(selection);
                }
                  parent.find(".front").click(function() {
                    parent.unbind(event);
                    parent.find(".front, .cache, ul").hide();
                    parent.find("*").css({zIndex:'auto'});

                    var indexHour = that.find('.timer .selectHour .selected').text();
                    var indexMin = that.find('.timer .selectMinutes .selected').text();
                    that.find('.heure .left .top span span, .heure .left .bottom span span').text(indexHour);
                    that.find('.heure .right .top span, .heure .right .bottom span').text(indexMin);

                });

              
              });
            });
            

              
              that.on('click', '.timer > .cache', function(){
                that.find('.timer').remove();
              });

            });

            


        }

        var icon = function(element, type, elementSize, color) {
            var html = htmlIcon(type);
            element.append(html);
            cssIcon(type, element, elementSize, color);
        }

        var htmlIcon = function(type) {
            return eval(type + "Icon();");
        }

        var cssIcon = function(type, element, elementSize, color) {
          console.log(type);
            eval(type + "Css(element, elementSize, color);");
            switch(type) {
                case 'calendar':
                    var cssRules = {
                      position:'absolute',
                      bottom: (10 / 20 * elementSize) + 'px',
                      right: (10 / 20 * elementSize) + 'px',
                      cursor:'pointer'
                    };
                    break;
                case 'clock':
                    var cssRules = {
                      position:'absolute',
                      bottom: (10 / 20 * elementSize) + 'px',
                      left: (10 / 20 * elementSize) + 'px',
                      cursor:'pointer'
                    };
                    break;
                default:
                    var cssRules = {};
            } 
            element.css(cssRules);
        }

        var calendarIcon = function() {
            var html = '<div class="calendarCenter"></div>';
            html += '<div class="stickLeft"></div>';
            html += '<div class="stickRight"></div>';
            html += '<div class="headLeft"></div>';
            html += '<div class="headCenter"></div>';
            html += '<div class="headRight"></div>';

            return html;
        }

        var calendarCss = function(element, elementSize, color) {
          console.log(elementSize);
            element.css( {
                position: 'relative',
                width: elementSize,
                height:elementSize,
            });

            element.find('.calendarCenter').css( {
                position: 'absolute',
                top: (6 / 20 * elementSize) + 'px',
                left: '0',
                width:(16 / 20 * elementSize) + 'px',
                height:(10 / 20 * elementSize) + 'px',
                border: (2 / 20 * elementSize) + 'px solid ' + color,
                borderRadius: (1 / 20 * elementSize) + 'px'
            });

            element.find('.stickLeft').css( {
                position: 'absolute',
                top: '0',
                left: (3.5 / 20 * elementSize) + 'px',
                width:(1.5 / 20 * elementSize) + 'px',
                height:(4 / 20 * elementSize) + 'px',
                border: (2 / 20 * elementSize) + 'px solid ' + color,
                borderRadius: (2 / 20 * elementSize) + 'px'
            });

            element.find('.stickRight').css( {
                position: 'absolute',
                top: '0',
                right: (3.5 / 20 * elementSize) + 'px',
                width:(1.5 / 20 * elementSize) + 'px',
                height:(4 / 20 * elementSize) + 'px',
                border: (2 / 20 * elementSize) + 'px solid ' + color,
                borderRadius: (2 / 20 * elementSize) + 'px'
            });

            element.find('.headLeft').css( {
                position: 'absolute',
                top: (3 / 20 * elementSize) + 'px',
                left: '0',
                width:(5 / 20 * elementSize) + 'px',
                height:(5 / 20 * elementSize) + 'px',
                borderTopLeftRadius: (2 / 20 * elementSize) + 'px',
                background: color
            });

            element.find('.headRight').css( {
                position: 'absolute',
                top: (3 / 20 * elementSize) + 'px',
                right: '0',
                width:(5 / 20 * elementSize) + 'px',
                height:(5 / 20 * elementSize) + 'px',
                borderTopRightRadius: (2 / 20 * elementSize) + 'px',
                background: color
            });

            element.find('.headCenter').css( {
                position: 'absolute',
                top: (3 / 20 * elementSize) + 'px',
                left: (7 / 20 * elementSize) + 'px',
                width:(6 / 20 * elementSize) + 'px',
                height:(5 / 20 * elementSize) + 'px',
                background: color
            });
        }

        var clockIcon = function() {
            var html = '<div class="clockBackground"></div>';
            html += '<div class="clockHour"></div>';
            html += '<div class="clockMin"></div>';

            return html;
        }

        var clockCss = function(element, elementSize, color) {
            element.css( {
                position: 'relative',
                width: elementSize,
                height:elementSize,
            });

            element.find('.clockBackground').css( {
                position: 'absolute',
                top: '0',
                left: '0',
                width:(16 / 20 * elementSize) + 'px',
                height:(16 / 20 * elementSize) + 'px',
                border: (2 / 20 * elementSize) + 'px solid ' + color,
                borderRadius: '50%'
            });

            element.find('.clockHour').css( {
                position: 'absolute',
                top: (9 / 20 * elementSize) + 'px',
                right: (9 / 20 * elementSize) + 'px',
                width:(6 / 20 * elementSize) + 'px',
                height:(2 / 20 * elementSize) + 'px',
                borderRadius: (1 / 20 * elementSize) + 'px',
                background: color
            });

            element.find('.clockMin').css( {
                position: 'absolute',
                bottom: (9 / 20 * elementSize) + 'px',
                left: (9 / 20 * elementSize) + 'px',
                width:(2 / 20 * elementSize) + 'px',
                height:(8 / 20 * elementSize) + 'px',
                borderRadius: (1 / 20 * elementSize) + 'px',
                background: color
            });
        }


        var changeDayInDatePicker = function(date){
          var startDay = new Date(date.getFullYear(), date.getMonth(), '01');
          var NbOfFirstDay = (startDay.getDay() == 0) ? startDay.getDay() + 6 : startDay.getDay() - 1;
          var firstDayOfCalendar = new Date(startDay.getTime() - (1000 * 60 * 60 * 24 * NbOfFirstDay));
                    
          var html2 = '';
          var calendarDate = firstDayOfCalendar;
                    for (var i = 0; i < 6; i++) {
                      html2 += '<tr>';
                      for (var j = 0; j < 7; j++) {
                        if (i != 0 || j!= 0) {
                          //add a day to the date
                          calendarDate = new Date(calendarDate.getTime() + (1000 * 60 * 60 * 24));
                        };

                        if (i == 5 && j == 6) {
                          html2 += '<td class="exit" >X</td>';
                        } else {
                          html2 += '<td class="' + (date.getMonth() != calendarDate.getMonth() ? 'disabled' : '')  + (date.getDate() == calendarDate.getDate() && date.getMonth() == calendarDate.getMonth() ? 'selected' : '') + '">' + calendarDate.getDate() + '</td>';
                        }
                        
                        
                      };
                      html2 += '</tr>';
                    };
          return html2;
        }


        var datePicker = function(date) {
          var monthText = months[date.getMonth()];

          var html = '<div class="datePicker">';
                html += '<div class="cache"></div>';
                html += '<div class="headerDatePicker">';
                  html += '<div>';
                    html += '<div class="arrow-left"></div>';
                    html += '<div class="select selectMonth">' + monthText + '</div>';
                    html += '<div class="arrow-right"></div>';
                  html += '</div>';
                  html += '<div>';
                    html += '<div class="arrow-left"></div>';
                    html += '<div class="select selectYear">' + date.getFullYear() + '</div>';
                    html += '<div class="arrow-right"></div>';
                  html += '</div>';
                html += '</div>';
                html += '<div class="calendarDatePicker">';
                  html += '<table>';
                    html += '<thead>';
                      html += '<tr>';
                        html += '<th>LUN</th><th>MAR</th><th>MER</th><th>JEU</th><th>VEN</th><th>SAM</th><th>DIM</th>';
                      html += '</tr>';
                    html += '</thead>';
                    html += '<tbody>';
                    html += changeDayInDatePicker(date);
                    html += '</tbody>';
                  html += '</table>';
                html += '</div>';
              html += '</div>';
          return html;
        }


        var fakeInputSelect = function(element, values) {
          var html = '<div class="cache"></div>';
              html += '<ul>';
          for (var i = 0; i < values.length; i++) {
              html += '<li>' + values[i] + '</li>';
          };
              html += '</ul>';
              html += '<div class="selected">' + element.text() + '</div>';
              html += '<div class="front"></div>';
          element.html(html);
          backgroundCss(element.find('.cache'));
        };

  
        var changeInputSelectDatePicker = function() {
          fakeInputSelect( that.find('.headerDatePicker .selectMonth'), months );

          fakeInputSelect( that.find('.headerDatePicker .selectYear'), years );

          that.find( ".select .selected" ).bind('click', function( eventClick ){
            var element = $(this);
            var parent = $(this).parents('.select');
            parent.find("*").css({zIndex:'150'});
            parent.find(".front, .cache, ul").show();
            var mousePositionStart = eventClick.pageY;
            var mousePositionEnd = eventClick.pageY + parent.find('ul').height() - parent.find('.selected').height() + 5;
            var sizeMouseMove = mousePositionEnd - mousePositionStart;
            var lengthList = (parent.find('ul li')).length;

            parent.mousemove(function( event ) {
              var mousePositionNow = event.pageY;
              if (mousePositionNow > mousePositionStart && mousePositionNow < mousePositionEnd) {
                var diff = mousePositionNow - mousePositionStart;
                parent.find('ul').css({top: '-' + diff + 'px' });

                var pos = parseInt(diff * lengthList / sizeMouseMove);
                var selection = parent.find('ul li').eq(pos).text();
                parent.find('.selected').html(selection);
              }
                parent.find(".front").click(function() {
                  parent.unbind(event);
                  parent.find(".front, .cache, ul").hide();
                  parent.find("*").css({zIndex:'auto'});

                  var indexMonth = $.inArray(that.find('.headerDatePicker .selectMonth .selected').text(), months);
                  var indexYear = that.find('.headerDatePicker .selectYear .selected').text();
                  var selectNewDate = new Date(indexYear, indexMonth);
                  var newCalendar = changeDayInDatePicker(selectNewDate);
                  that.find('.calendarDatePicker table tbody').html(newCalendar);
                  
                  selectMois = (selectNewDate.getMonth() + 1) < 10 ? '0' + (selectNewDate.getMonth() + 1) : (selectNewDate.getMonth() + 1);
                  selectJour = selectNewDate.getDate() < 10 ? '0' + selectNewDate.getDate() : selectNewDate.getDate();
            

                  that.find('.horloge .date .block .weekBlock ul li').css({color:'#cccccc'});
                  that.find('.week li').eq(selectNewDate.getDay() -1).css({color:'#333333'});
                  that.find('.jour span').text(selectJour);
                  that.find('.mois span').text(selectMois);
                  that.find('.annee span').text(selectNewDate.getFullYear());

              });

            
            });
          });
          
          that.find('.datePicker .headerDatePicker > div:first-child .arrow-left').click(function() {
            var thisMonth = $.inArray(that.find('.headerDatePicker .selectMonth .selected').text(), months);
            var thisYear = that.find('.headerDatePicker .selectYear .selected').text();

            if (thisMonth == 0) {
              thisMonth = 11;
              thisYear --;
            } else {
              thisMonth --;
            }

            var newDate = new Date(thisYear, thisMonth, '01');
            that.find('.headerDatePicker .selectMonth .selected').html(months[newDate.getMonth()]);
            that.find('.headerDatePicker .selectYear .selected').html(newDate.getFullYear());
            var newCalendar = changeDayInDatePicker(newDate);
            that.find('.calendarDatePicker table tbody').html(newCalendar);

            selectMois = (newDate.getMonth() + 1) < 10 ? '0' + (newDate.getMonth() + 1) : (newDate.getMonth() + 1);
            selectJour = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();

            that.find('.horloge .date .block .weekBlock ul li').css({color:'#cccccc'});
            that.find('.week li').eq(newDate.getDay() -1).css({color:'#333333'});
            that.find('.jour span').text(selectJour);
            that.find('.mois span').text(selectMois);
            that.find('.annee span').text(newDate.getFullYear());
          });

          that.find('.datePicker .headerDatePicker > div:first-child .arrow-right').click(function() {
            var thisMonth = $.inArray(that.find('.headerDatePicker .selectMonth .selected').text(), months);
            var thisYear = that.find('.headerDatePicker .selectYear .selected').text();

            if (thisMonth == 11) {
              thisMonth = 0;
              thisYear ++;
            } else {
              thisMonth ++;
            }

            var newDate = new Date(thisYear, thisMonth, '01');
            that.find('.headerDatePicker .selectMonth .selected').html(months[newDate.getMonth()]);
            that.find('.headerDatePicker .selectYear .selected').html(newDate.getFullYear());
            var newCalendar = changeDayInDatePicker(newDate);
            that.find('.calendarDatePicker table tbody').html(newCalendar);

            selectMois = (newDate.getMonth() + 1) < 10 ? '0' + (newDate.getMonth() + 1) : (newDate.getMonth() + 1);
            selectJour = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();

            that.find('.horloge .date .block .weekBlock ul li').css({color:'#cccccc'});
            that.find('.week li').eq(newDate.getDay() -1).css({color:'#333333'});
            that.find('.jour span').text(selectJour);
            that.find('.mois span').text(selectMois);
            that.find('.annee span').text(newDate.getFullYear());
          });

          that.find('.datePicker .headerDatePicker > div:last-child .arrow-left').click(function() {
            var thisMonth = $.inArray(that.find('.headerDatePicker .selectMonth .selected').text(), months);
            var thisYear = that.find('.headerDatePicker .selectYear .selected').text();

            thisYear --;

            var newDate = new Date(thisYear, thisMonth, '01');
            that.find('.headerDatePicker .selectMonth .selected').html(months[newDate.getMonth()]);
            that.find('.headerDatePicker .selectYear .selected').html(newDate.getFullYear());
            var newCalendar = changeDayInDatePicker(newDate);
            that.find('.calendarDatePicker table tbody').html(newCalendar);

            selectMois = (newDate.getMonth() + 1) < 10 ? '0' + (newDate.getMonth() + 1) : (newDate.getMonth() + 1);
            selectJour = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();

            that.find('.horloge .date .block .weekBlock ul li').css({color:'#cccccc'});
            that.find('.week li').eq(newDate.getDay() -1).css({color:'#333333'});
            that.find('.jour span').text(selectJour);
            that.find('.mois span').text(selectMois);
            that.find('.annee span').text(newDate.getFullYear());
          });

          that.find('.datePicker .headerDatePicker > div:last-child .arrow-right').click(function() {
            var thisMonth = $.inArray(that.find('.headerDatePicker .selectMonth .selected').text(), months);
            var thisYear = that.find('.headerDatePicker .selectYear .selected').text();

            thisYear ++;

            var newDate = new Date(thisYear, thisMonth, '01');
            that.find('.headerDatePicker .selectMonth .selected').html(months[newDate.getMonth()]);
            that.find('.headerDatePicker .selectYear .selected').html(newDate.getFullYear());
            var newCalendar = changeDayInDatePicker(newDate);
            that.find('.calendarDatePicker table tbody').html(newCalendar);

            selectMois = (newDate.getMonth() + 1) < 10 ? '0' + (newDate.getMonth() + 1) : (newDate.getMonth() + 1);
            selectJour = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();

            that.find('.horloge .date .block .weekBlock ul li').css({color:'#cccccc'});
            that.find('.week li').eq(newDate.getDay() -1).css({color:'#333333'});
            that.find('.jour span').text(selectJour);
            that.find('.mois span').text(selectMois);
            that.find('.annee span').text(newDate.getFullYear());
          });

        }

        var arrow = function(direction, element) {
          switch (direction) {
            case 'left':
              var arrowCss = function() {
                element.css({
                  width: 0,
                  height: 0, 
                  borderTop: parseInt(size * 10 / 400) + 'px solid transparent',
                  borderBottom: parseInt(size * 10 / 400) + 'px solid transparent', 
                
                  borderRight: parseInt(size * 10 / 400) + 'px solid #dddddd', 
                  cursor:'pointer'
                });
              }
              var hoverArrow = {borderRight: parseInt(size * 10 / 400) + 'px solid rgb(0, 155, 255)'};
              break;
            case 'right':
              var arrowCss = function() {
                element.css({
                  width: 0,
                  height: 0, 
                  borderTop: parseInt(size * 10 / 400) + 'px solid transparent',
                  borderBottom: parseInt(size * 10 / 400) + 'px solid transparent', 
                
                  borderLeft: parseInt(size * 10 / 400) + 'px solid #dddddd', 
                  cursor:'pointer'
                });
              }
              var hoverArrow = {borderLeft: parseInt(size * 10 / 400) + 'px solid rgb(0, 155, 255)'};
              break;
            case 'up':
              var arrowCss = function() {
                element.css({
                  width: 0,
                  height: 0, 
                  borderLeft: parseInt(size * 10 / 400) + 'px solid transparent',
                  borderRight: parseInt(size * 10 / 400) + 'px solid transparent',
                
                  borderBottom: parseInt(size * 10 / 400) + 'px solid #dddddd', 
                  cursor:'pointer'
                });
              }
              var hoverArrow = {borderBottom: parseInt(size * 10 / 400) + 'px solid rgb(0, 155, 255)'};
              break;
            case 'down':
              var arrowCss = function() {
                element.css({
                  width: 0,
                  height: 0, 
                  borderLeft: parseInt(size * 10 / 400) + 'px solid transparent',
                  borderRight: parseInt(size * 10 / 400) + 'px solid transparent',
                
                  borderTop: parseInt(size * 10 / 400) + 'px solid #dddddd', 
                  cursor:'pointer'
                });
              }
              var hoverArrow = {borderTop: parseInt(size * 10 / 400) + 'px solid rgb(0, 155, 255)'};
              break;
          }

          arrowCss();
          element.hover(
            function() {
              $(this).css(hoverArrow);
            }, 
            function() {
              arrowCss();
            }
          );

        }

        var backgroundCss = function(element) {
          element.css({
            display:'none',
            position:'fixed',
            top:0,
            left:0,
            width:'100%',
            height:'100%',
            backgroundColor:'rgba(0,0,0,.5)'
          });
        }

       


        var currentDate = dating();
        construct(currentDate);
        addCss(currentDate);
         if(options.active == true) {
            active();
         }

         if(options.setter == true) {
            setter(currentDate);
         }





        if(options.active == true) {
            setInterval(function() {
                active();
               }, 60000); 
        }


        return this;
    }; 
})( jQuery );





$(document).ready(function() {




});