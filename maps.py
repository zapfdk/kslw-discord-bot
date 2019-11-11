from enum import Enum
import json 
from typing import DefaultDict
from collections import defaultdict
import operator

from fuzzywuzzy import fuzz

class MapState(Enum):
    available = 1
    out = 2
    banned = 3
    picked = 4

    states = {
        1: "available",
        2: "out",
        3: "banned",
        4: "picked"
    }

    @classmethod
    def to_string(cls, state):
        return cls.states[state]

class KslwException(Exception):
    def __init__(self, message):
        super().__init__(message)

class KslwMap:
    def __init__(self, id, name, state):
        self.id = id
        self.name = name
        self.state = state

class KslwMaps:
    def __init__(self):
        self.map_list : DefaultDict[int, KslwMap] = defaultdict()

    def add_map(self, kslw_map: KslwMap):
        self.map_list[kslw_map.id] = kslw_map

    def search_map_fuzzy(self, fuzzy_search_string: str):
        search_results : DefaultDict[int,int] = defaultdict()

        for id, kslw_map in self.map_list.items():
            search_results[id] = fuzz.ratio(fuzzy_search_string.lower(), kslw_map.name.lower())

        return max(search_results.items(), key=operator.itemgetter(1))[0]

    def get_map_name(self, id: int):
        return self.map_list[id].name

    def get_map_name_fuzzy(self, fuzzy_search_string: str):
        result_id = self.search_map_fuzzy(fuzzy_search_string)
        return self.get_map_name(result_id).name

    def ban_map(self, map_id: int):
        kslw_map = self.map_list[map_id]

        if (kslw_map.state != MapState.available):
            raise KslwException(f"Map {kslw_map.name} not available!")

        kslw_map.state = MapState.banned

    def pick_map(self, map_id: int):
        kslw_map = self.map_list[map_id]

        if (kslw_map.state != MapState.available):
            raise KslwException(f"Map {kslw_map.name} not available!")

        kslw_map.state = MapState.picked

    def out_map(self, map_id: int):        
        kslw_map = self.map_list[map_id]
        kslw_map.state = MapState.out

    def reset_map(self, map_id: int):
        kslw_map = self.map_list[map_id]
        kslw_map.state = MapState.available

    def reset_map_list(self):
        for kslw_map in self.map_list.values():
            kslw_map.state = MapState.available

    def __str__(self):
        return self.stringify_maps(self.map_list.values())

    def stringify_maps(self, maps):
        map_str = ""
        for kslw_map in maps:
            map_str += kslw_map.name + ": " + kslw_map.state.name + "\n"
        return map_str

    def get_maps(self, states: list=None):
        if states is None:
            return self.map_list.values()
        return [kslw_map for kslw_map in self.map_list.values() if kslw_map.state in states]

    
def get_map_list():
    kslw_maps = KslwMaps()

    with open("maps.json") as map_file:
        data = json.load(map_file)

        for map_data in data:
            kslw_map = KslwMap(map_data["id"], map_data["name"], MapState.available)
            kslw_maps.add_map(kslw_map)

    return kslw_maps