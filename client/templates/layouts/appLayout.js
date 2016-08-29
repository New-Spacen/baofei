if (Meteor.isClient) {
  Tracker.autorun(function () {
    if (Reload.isWaitingForResume()) {
      alert("程序将更新到最新版本! ");
      window.location.reload();
    }
  });

}

Date.prototype.format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};  //将时间装换为字符串

Template.appLayout.rendered = function () {
  Session.set('currentTab', 'trending');
};


Template.appLayout.events({
  'click [data-action=newcar]': function (event, template) {
    // IonActionSheet.show({
    //   // titleText: '',
    //   buttons: [
    //     { text: '<i class="icon ion-social-twitter"></i> 报废信息' },
    //     // { text: '<i class="icon ion-ios-email"></i> 分享' },
    //   ],
    //   cancelText: '取消',
    //   buttonClicked: function(index) {
    //     if (index === 0) {
    //       console.log('报废信息');
    //       IonModal.open('newcar');
    //     }
    //     // if (index === 1) {
    //     //   console.log('Email!');
    //     // }
    //     return true;
    //   }
    // });
    if (Meteor.user()) {
      IonModal.open('newcar');
    } else {
        IonModal.open('signIn');
    }
  },
'click [data-action=find]': function (event, template) {
        IonActionSheet.show({
            buttons: [
                {text: '<i class="icon ion-social-twitter"></i> 按车牌号查询'},
                {text: '<i class="icon ion-social-twitter"></i> 按车架号查询'},
                {text: '<i class="icon ion-social-twitter"></i> 按发动机号查询'},
            ],
            cancelText: '取消',
            buttonClicked: function(index) {
                if (index === 0) {
                    console.log('按车牌号查询');
                    IonModal.open('find');
                }
                if (index === 1) {
                    console.log('按车架号查询');
                    IonModal.open('findone');
                }
                 if (index === 2) {
                    console.log('按发动机号查询');
                    IonModal.open('findtwo');
                }
                return true;
            }

        });
    },
  
  'click [modal=ssgz]': function (event, template) {
    var imei=event.target.attributes['data-id'].value;
  	Session.set('imei',imei);
    IonModal.open('maprelview',imei);
  }  
  
});
