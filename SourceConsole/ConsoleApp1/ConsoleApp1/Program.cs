using Microsoft.SqlServer.Server;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Telegram.Bot;
using Telegram.Bot.Types.Enums;
using Telegram.Bot.Types;
using Telegram.Bot.Polling;

namespace ConsoleApp1
{
    internal class Program
    {
        static ITelegramBotClient bot = new TelegramBotClient("6008124704:AAGf0ttePy0HKso96_9TGGsG_h04gxEvOxA");

        public static async Task HandleUpdateAsync(ITelegramBotClient botClient, Update update, CancellationToken cancellationToken)
        {
            Console.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(update));
            if (update.Type == UpdateType.Message)
            {
                var message = update.Message;
                Console.WriteLine(message.Text);

                if (message.Text.ToLower() == "/start")
                {
                    await botClient.SendTextMessageAsync(
                        chatId: message.Chat,
                        text: "🌟 Welcome to the NewsBot! Your one-stop destination for all the latest news and updates from around the world. 📰✨ \n " +
                        "To get the latest news, simply type \n /latestnews \n and stay informed about the world's happenings!");

                    return;
                }
                if (message.Text.ToLower() == "/latestnews")
                {
                    await botClient.SendTextMessageAsync(
                        chatId: message.Chat,
                        text: "1.World Leaders Gather for Global Climate Summit in New York \n " +
                        "2.Tech Giant XYZ Launches Groundbreaking AI-powered Smartphone \n " +
                        "3.New Study Reveals Surprising Benefits of Meditation for Mental Health \n " +
                        "4.Space Exploration Company Successfully Lands Rover on Mars \n" +
                        "5.Breaking: Stock Market Hits Record High Amidst Economic Recovery \n " +
                        "6.Renowned Author Publishes Highly Anticipated Novel, Receives Rave Reviews \n " +
                        "7.Major International Film Festival Announces Star - studded Lineup \n " +
                        "8.Scientists Make Groundbreaking Discovery in the Field of Quantum Computing \n " +
                        "9.Health Officials Warn of New Strain of Flu Virus Spreading Rapidly \n " +
                        "10.Sports Team Makes Historic Comeback, Secures Championship Title");

                    return;
                }
                if (update.Type == UpdateType.CallbackQuery)
                {
                    // Get the inline button click
                }
            }
        }

        public static async Task HandleErrorAsync(ITelegramBotClient botClient, Exception exception, CancellationToken cancellationToken)
        {
            // Handler get errors and post in JSON form in console
            Console.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(exception));
        }

        static void Main(string[] args)
        {
            Console.WriteLine("Запущен бот " + bot.GetMeAsync().Result.FirstName);
            var cts = new CancellationTokenSource();
            var cancellationToken = cts.Token;
            var receiverOptions = new ReceiverOptions
            {
                AllowedUpdates = { }, 
            };
            bot.StartReceiving(
                HandleUpdateAsync,
                HandleErrorAsync,
                receiverOptions,
                cancellationToken
            );
            Console.ReadLine();
        }
    }
}
