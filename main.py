from kivy.uix.gridlayout import GridLayout
from kivy.uix.label import Label
from kivy.uix.button import Button
from kivy.app import App
from kivy.uix.scrollview import ScrollView
from kivy.core.window import Window

from bus_api import *

FONT = "DroidSansFallback.ttf"

def wrapper (self):
    # https://stackoverflow.com/a/43695096
    self.bind(
        width=lambda *x:
        self.setter("text_size")(self, (self.width, None)),
        texture_size=lambda *x: self.setter("height")(self, self.texture_size[1]))


class WrappedLabel(Label):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        wrapper(self)
        self.font_name = FONT
        self.font_size = 25
        self.color = [0, 0, 0, 1]
        self.size_hint_y = None


class WrappedButton(Button):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        wrapper(self)


class BusApp (App):

    def build (self):
        Window.clearcolor = (1, 1, 1, 1)
        self.prev_button = None

        # Bus locations
        self.locations = {"Block 713": "84479",
                          "Block 745": "84471",
                          "Opp Bedok Central PO 巴刹": "84359",
                          "Bedok Int 车头": "84009"}

        # Main layout
        main_layout = GridLayout(cols=1, size_hint_y=None)
        main_layout.bind(minimum_height=main_layout.setter("height"))

        main_layout.add_widget(WrappedLabel(text="巴士",
                                            halign="center"))

        # Location layout
        for location in self.locations:
            location_btn = WrappedButton(size_hint=(1,None),
                                         background_color=(0,0,0,1),
                                         font_name=FONT,
                                         halign="center")
            location_btn.text = location
            location_btn.font_size = 25
            location_btn.bind(on_release=self.get_timings)
            main_layout.add_widget(location_btn)

        # Time layout
        self.time_layout = GridLayout(cols=3, size_hint_y=None)
        self.time_layout.bind(minimum_height=self.time_layout.setter("height"))

        main_layout.add_widget(self.time_layout)

        # Scroll view
        self.scroll_view = ScrollView(bar_width=10,
                                      size_hint=(1,1),
                                      size=(Window.width, Window.height))
        self.scroll_view.add_widget(main_layout)

        return self.scroll_view


    def get_timings (self, instance):
        # Clear widgets
        self.time_layout.clear_widgets()

        if self.prev_button:
            self.prev_button.background_color = [0,0,0,1]

        self.prev_button = instance
        instance.background_color = [1,0,0,1]

        service_no = ["66", "228"]
        bus_stop_code = self.locations[instance.text]
        bus_timings = get_bus_timings(bus_stop_code, service_no)
        for bus_timing in bus_timings:
            # Add service number, first bus, second bus
            for index in range (3):
                label = WrappedLabel(text=bus_timing[index])
                if index == 0:
                    # Colorize service code
                    label.color = [1,0,0,1]
                    label.halign = "center"
                self.time_layout.add_widget(label)

        self.scroll_view.size = (Window.width, Window.height)


if __name__ == "__main__":
    BusApp().run()
