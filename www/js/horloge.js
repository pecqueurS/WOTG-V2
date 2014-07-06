(function( $ ){
    $.fn.horloge = function(size, options) {
      
        var width = size + 'px';
        var height = parseInt(size/2) + 'px';

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
            mois = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth();
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

            // Creation icones
            icon(that.find('.icon-calendar'), 'calendar', 32, '#dddddd');
            icon(that.find('.icon-clock'), 'clock', 32, '#dddddd');
            $('.icon-calendar').hover(function() {
                icon($(this), 'calendar', 32, 'rgb(0,153,255)');
            }, function() {
                icon($(this), 'calendar', 32, '#dddddd');
            });
            $('.icon-clock').hover(function() {
                icon($(this), 'clock', 32, 'rgb(0,153,255)');
            }, function() {
                icon($(this), 'clock', 32, '#dddddd');
            });
        };

        var addCss = function(date) {
            that.find('.horloge').css( {
               position:'relative',
               margin: (size/4) + 'px auto',
               width: width,
               height: height,
               background: 'linear-gradient(to bottom, #666666, #333333)', 
               borderRadius: parseInt(size * 10 / 400) + 'px'
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

            var weekDay = date.getDay() -1; console.log(date);
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
               var newDay = date.getDate() + difference;
               date.setDate(newDay);
               refresh(date);

            });
        }

        var icon = function(element, type, size, color) {
            var html = htmlIcon(type);
            element.append(html);
            cssIcon(type, element, size, color);
        }

        var htmlIcon = function(type) {
            return eval(type + "Icon();");
        }

        var cssIcon = function(type, element, size, color) {
            eval(type + "Css(element, size, color);");
            element.css({cursor:'pointer'});
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

        var calendarCss = function(element, size, color) {
            console.log(color);
            element.css( {
                position: 'relative',
                width: size,
                height:size,
            });

            element.find('.calendarCenter').css( {
                position: 'absolute',
                top: (6 / 20 * size) + 'px',
                left: '0',
                width:(16 / 20 * size) + 'px',
                height:(10 / 20 * size) + 'px',
                border: (2 / 20 * size) + 'px solid ' + color,
                borderRadius: (1 / 20 * size) + 'px'
            });

            element.find('.stickLeft').css( {
                position: 'absolute',
                top: '0',
                left: (3.5 / 20 * size) + 'px',
                width:(1.5 / 20 * size) + 'px',
                height:(4 / 20 * size) + 'px',
                border: (2 / 20 * size) + 'px solid ' + color,
                borderRadius: (2 / 20 * size) + 'px'
            });

            element.find('.stickRight').css( {
                position: 'absolute',
                top: '0',
                right: (3.5 / 20 * size) + 'px',
                width:(1.5 / 20 * size) + 'px',
                height:(4 / 20 * size) + 'px',
                border: (2 / 20 * size) + 'px solid ' + color,
                borderRadius: (2 / 20 * size) + 'px'
            });

            element.find('.headLeft').css( {
                position: 'absolute',
                top: (3 / 20 * size) + 'px',
                left: '0',
                width:(5 / 20 * size) + 'px',
                height:(5 / 20 * size) + 'px',
                borderTopLeftRadius: (2 / 20 * size) + 'px',
                background: color
            });

            element.find('.headRight').css( {
                position: 'absolute',
                top: (3 / 20 * size) + 'px',
                right: '0',
                width:(5 / 20 * size) + 'px',
                height:(5 / 20 * size) + 'px',
                borderTopRightRadius: (2 / 20 * size) + 'px',
                background: color
            });

            element.find('.headCenter').css( {
                position: 'absolute',
                top: (3 / 20 * size) + 'px',
                left: (7 / 20 * size) + 'px',
                width:(6 / 20 * size) + 'px',
                height:(5 / 20 * size) + 'px',
                background: color
            });

            
        }

        var clockIcon = function() {
            var html = '<div class="clockBackground"></div>';
            html += '<div class="clockHour"></div>';
            html += '<div class="clockMin"></div>';

            return html;
        }

        var clockCss = function(element, size, color) {
            element.css( {
                position: 'relative',
                width: size,
                height:size,
            });

            element.find('.clockBackground').css( {
                position: 'absolute',
                top: '0',
                left: '0',
                width:(16 / 20 * size) + 'px',
                height:(16 / 20 * size) + 'px',
                border: (2 / 20 * size) + 'px solid ' + color,
                borderRadius: '50%'
            });

            element.find('.clockHour').css( {
                position: 'absolute',
                top: (9 / 20 * size) + 'px',
                right: (9 / 20 * size) + 'px',
                width:(6 / 20 * size) + 'px',
                height:(2 / 20 * size) + 'px',
                borderRadius: (1 / 20 * size) + 'px',
                background: color
            });

            element.find('.clockMin').css( {
                position: 'absolute',
                bottom: (9 / 20 * size) + 'px',
                left: (9 / 20 * size) + 'px',
                width:(2 / 20 * size) + 'px',
                height:(8 / 20 * size) + 'px',
                borderRadius: (1 / 20 * size) + 'px',
                background: color
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