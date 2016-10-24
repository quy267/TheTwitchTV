/**
 * Created by MyPC on 26/09/2016.
 */
$(document).ready(function () {
    var channelList = ["freecodecamp", "ogamingsc2", "storbeck", "terakilobyte", "esl_sc2", "habathcx", "RobotCaleb", "thomasballinger", "sheevergaming", "noobs2ninjas", "beohoff", "comster404", "brunofin"];
    var clientTw = "?client_id=nu3jzl074ajqx13n1792nxt5qsmcrhb";

    var getPics = function (list) {
        var item = undefined;
        var streamStatus = undefined;
        var channelLogo = undefined;

        list.forEach(function (channel) {
            var channelUrl = "https://api.twitch.tv/kraken/channels/" + channel + clientTw;
            var streamUrl = "https://api.twitch.tv/kraken/streams/" + channel + clientTw;
            var channelData = undefined;
            var streamData = undefined;

            $.getJSON(channelUrl, function (data) {
                channelData = data;
                if (channelData.status != 422 && channelData.status != 404) {
                    $.getJSON(streamUrl, function (data) {
                        streamData = data;
                        if (channelData.logo == null) {
                            channelLogo = '<i class="fa fa-exclamation-circle fa-4x pull-xs-left"></i>';
                        } else {
                            channelLogo = '<img class="pull-xs-left img-circle" src="' + channelData.logo + '">';
                        }

                        if (streamData.stream == null) {
                            if (channelData.status == null) {
                                streamStatus = '<p class="col-xs-8 text-xs-center pull-xs-right">Offline</p>';
                            }
                            else {
                                streamStatus = '<p class="col-xs-8 text-xs-center pull-xs-right">' + channelData.status + '</p>'
                            }
                        }
                        else {
                            if (channelData.status == null) {
                                streamStatus = '<p class="col-xs-8 text-xs-center pull-xs-right">Online</p>';
                            }
                            else {
                                streamStatus = '<p class="col-xs-8 text-xs-center pull-xs-right">' + channelData.game + ': ' + channelData.status + '</p>'
                            }
                        }
                        item = $('<li class="list-group-item row">' + channelLogo + '<div class="row">' + '<a class="col-xs-3 text-xs-center" href="' + channelData.url + '">' + channelData.display_name + '</a>' + streamStatus + ' </div></li>');

                        if (streamData.stream == null) {
                            item.appendTo('#offline').clone().appendTo('#all');

                        }
                        else {
                            item.appendTo('#online').clone().appendTo('#all');
                        }
                    });
                }
                else {
                    item = $('<li class="list-group-item row"><i class="fa fa-exclamation-circle fa-3x pull-xs-left"></i><div class="row"><a class="col-xs-3 text-xs-center" href="">' + channel + '</a><p class="col-xs-8 text-xs-center pull-xs-right">Account Closed or Not Found</p> </div></li>');
                    item.appendTo('#all');
                }
            });
        });
    };
    getPics(channelList);
});