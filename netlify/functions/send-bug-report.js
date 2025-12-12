exports.handler = async (event, context) => {
  
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { description, nick } = JSON.parse(event.body);

    if (!description) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Description is required' })
      };
    }

    const message = ` НОВЫЙ БАГ РЕПОРТ

📝 Описание:
${description}

👤 Ник: ${nick || 'Аноним'}

🌐 URL: ${event.headers.referer || 'Unknown'}
⏰ Время: ${new Date().toLocaleString('ru-RU')}`;

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: message
        })
      }
    );

    const data = await telegramResponse.json();

    if (!data.ok) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to send message' })
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
