from kivy.uix.gridlayout import GridLayout
from kivy.uix.label import Label
from kivy.uix.button import Button
from kivy.app import App
from kivy.uix.scrollview import ScrollView
from kivy.core.window import Window

class BusApp (App):
    def build (self):
        Window.clearcolor = (1,1,1,1)
        # Main layout
        main_layout = GridLayout(cols=1, size_hint_y=None)
        main_layout.bind(minimum_height=main_layout.setter("height"))

        main_layout.add_widget(Label(text="Bus App"))

        # Bus locations
        locations = {"Block 713": "84479",
                     "Block 745": "84471",
                     "Opp Bedok Central PO 巴刹": "84359",
                     "Bedok Int 车头": "84009"}

        for location in locations:
            location_btn = Button(size_hint=(1,None),
                                  background_color=(0,0,0,1),
                                  font_name="DroidSansFallback.ttf")
            location_btn.text = location
            location_btn.text_size = location_btn.size
            location_btn.font_size = 20
            location_btn.bind(on_release=self.get_timings)
            main_layout.add_widget(location_btn)

        # Scroll view
        scroll_view = ScrollView(bar_width=10, size_hint=(1,1), size=(Window.width, Window.height))
        scroll_view.add_widget(main_layout)

        return scroll_view


    def get_timings (self, instance):
        print(instance.text)

if __name__ == "__main__":
    BusApp().run()