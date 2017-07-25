"use strict";

const Alexa = require("alexa-sdk");

const states = {
  ORDER_MODE: '_ORDER_MODE',
  TORTILLA_MODE: '_TORTILLA_MODE',
  MEAT_MODE: '_MEAT_MODE',
  VEGGIE_MODE: '_VEGGIE_MODE',
};

const newSessionhandlers = {
  LaunchRequest: function() {
    this.emit(':ask', 'Welcome to the taco palace, what do you want?');
  },

  SessionEndedRequest: function() {
    this.emit(':tell', 'Goodbye from the taco palace');
  },

  Unhandled: function() {
    this.emit(':ask', 'Sorry I didn\'t get that. Welcome to the taco palace, what do you want?');
  },

  'AMAZON.HelpIntent': function() {
    this.emit('LaunchRequest');
  },

  'AMAZON.StopIntent': function() {
    this.emit(':tell', 'Goodbye from the taco palace');
  },

  'AMAZON.CancelIntent': function() {
    this.emit(':tell', 'Goodbye from the taco palace');
  },

  OrderTacoIntent: function() {
    this.handler.state = states.ORDER_MODE;
    this.emit(':ask', 'Excellent. Please, tell me what is your name?');
  },

};

const orderHandler = Alexa.CreateStateHandler(states.ORDER_MODE, {
  NameIntent: function() {
    const customerName = this.event.request.intent.slots.name.value;
    if (customerName) {
      this.attributes['customerName'] = customerName
      this.handler.state = states.TORTILLA_MODE;
      this.emit(':ask', `Welcome ${customerName}, please tell me which kind of tortilla do you want.`);
    } else {
      this.emit('Unhandled');
    }
  },

  SessionEndedRequest: function() {
    this.emit(':tell', 'Goodbye from the taco palace');
  },

  Unhandled: function() {
    this.emit(':ask', 'Sorry I didn\'t get that. Please, tell me what is your name');
  },

  'AMAZON.HelpIntent': function() {
    this.emit(':ask', 'Please say you first name');
  },

  'AMAZON.StopIntent': function() {
    this.emit(':tell', 'Goodbye from the taco palace');
  },

  'AMAZON.CancelIntent': function() {
    this.emit(':tell', 'Goodbye from the taco palace');
  },
});

const tortillaModeHandlers = Alexa.CreateStateHandler(states.TORTILLA_MODE, {
  TortillaIntent: function() {
    const tortillaType = this.event.request.intent.slots.tortillaType.value;
    if (tortillaType) {
      this.handler.state = states.MEAT_MODE;
      this.attributes['tortillaType'] = tortillaType;
      this.emit(':ask', 'Please tell me the type of meat you want?');
    } else {
      this.emit('Unhandled');
    }
  },

  SessionEndedRequest: function() {
    this.emit(':tell', 'Goodbye from the taco palace');
  },

  Unhandled: function() {
    this.emit(':ask', 'Sorry I didn\'t get that. Please say the type of tortilla you want');
  },

  'AMAZON.HelpIntent': function() {
    this.emit(':ask', 'Please say a type of tortilla');
  },

  'AMAZON.StopIntent': function() {
    this.emit(':tell', 'Goodbye from the taco palace');
  },

  'AMAZON.CancelIntent': function() {
    this.emit(':tell', 'Goodbye from the taco palace');
  },
});

const meatModeHandlers = Alexa.CreateStateHandler(states.MEAT_MODE, {
  MeatIntent: function() {
    const meatType = this.event.request.intent.slots.meatType.value;
    if (meatType) {
      this.handler.state = states.VEGGIE_MODE;
      this.attributes['meatType'] = meatType;
      this.emit(':ask', 'Please tell if you want only with onions, coriander or both');
    } else {
      this.emit('Unhandled');
    }
  },

  SessionEndedRequest: function() {
    this.emit(':tell', 'Goodbye from the taco palace');
  },

  Unhandled: function() {
    this.emit(':ask', 'Sorry I didn\'t get that. Please say the type of meat you want');
  },

  'AMAZON.HelpIntent': function() {
    this.emit(':ask', 'Please say a type of meat');
  },

  'AMAZON.StopIntent': function() {
    this.emit(':tell', 'Goodbye from the taco palace');
  },

  'AMAZON.CancelIntent': function() {
    this.emit(':tell', 'Goodbye from the taco palace');
  },
});

const veggieModeHandlers = Alexa.CreateStateHandler(states.VEGGIE_MODE, {
  VegetableIntent: function() {
    const value = this.event.request.intent.slots.vegetableType.value;
    if (value) {
      const veggies = value.split(' ');
      this.attributes['veggies'] = veggies.length > 1 ? `with ${veggies[0]} and ${veggies[1]}` : `with ${veggies[0]}`;
    } else {
      this.attributes['veggies'] = 'without vegetables';
    }
    this.emit(':tell', `Here is your order ${this.attributes['customerName']}. 
                        One taco with ${this.attributes['tortillaType']} tortilla,
                        ${this.attributes['meatType']} meat and ${this.attributes['veggies']}.
                        Your order will be ready soon.`);
  },

  SessionEndedRequest: function() {
    this.emit(':tell', 'Goodbye from the taco palace');
  },

  Unhandled: function() {
    this.emit(':ask', 'Sorry I didn\'t get that. Please say the type of veggies you want');
  },

  'AMAZON.HelpIntent': function() {
    this.emit(':ask', 'Please say the types of veggies you want');
  },

  'AMAZON.StopIntent': function() {
    this.emit(':tell', 'Goodbye from the taco palace');
  },

  'AMAZON.CancelIntent': function() {
    this.emit(':tell', 'Goodbye from the taco palace');
  },
});


// Alexa sdk handler has the request received, aws context and a callback
exports.handler = (event, context, callback) => {
  const alexa = Alexa.handler(event, context, callback);
  alexa.registerHandlers(newSessionhandlers, orderHandler, tortillaModeHandlers, meatModeHandlers, veggieModeHandlers);
  alexa.execute();
};
