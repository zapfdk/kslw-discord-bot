import os
import random
from dotenv import load_dotenv

from discord.ext import commands

from maps import get_map_list, MapState, KslwException

load_dotenv()
token = os.getenv('BOT_TOKEN')

bot = commands.Bot(command_prefix='/')

maps = get_map_list()

@bot.event
async def on_ready():
    print(f'{bot.user.name} has connected to Discord!')

@bot.command(name="maps")
async def get_maps(ctx):
    map_list = maps.get_maps()
    await ctx.send(maps.stringify_maps(map_list))

@bot.command(name="mapsavailable")
async def get_maps_available(ctx):
    map_list = maps.get_maps([MapState.available, MapState.picked, MapState.banned])
    await ctx.send(maps.stringify_maps(map_list))

@bot.command(name="ban")
async def ban(ctx, arg):
    result_id = maps.search_map_fuzzy(arg)
    result_name = maps.get_map_name(result_id)
    maps.ban_map(result_id)

    map_states = [MapState.available, MapState.banned, MapState.picked]

    await ctx.send("Map banned: " + result_name)
    await ctx.send(maps.stringify_maps(maps.get_maps(map_states)))


@bot.command(name="pick")
async def pick(ctx, arg):
    result_id = maps.search_map_fuzzy(arg)
    result_name = maps.get_map_name(result_id)
    maps.pick_map(result_id)

    map_states = [MapState.available, MapState.banned, MapState.picked]

    await ctx.send("Map picked: " + result_name)
    await ctx.send(maps.stringify_maps(maps.get_maps(map_states)))


@bot.command(name="out")
async def out(ctx, arg):
    result_id = maps.search_map_fuzzy(arg)
    result_name = maps.get_map_name(result_id)
    maps.out_map(result_id)

    map_states = [MapState.available, MapState.banned, MapState.picked]

    await ctx.send("Map is out: " + result_name)

@bot.command(name="resetmap")
async def resetmap(ctx, arg):
    result_id = maps.search_map_fuzzy(arg)
    result_name = maps.get_map_name(result_id)
    maps.reset_map(result_id)

    map_states = [MapState.available, MapState.banned, MapState.picked]

    await ctx.send("Map resetted: " + result_name)


@bot.command(name="resetall")
async def resetall(ctx):
    maps.reset_map_list()
    map_list = maps.get_maps()
    await ctx.send(maps.stringify_maps(map_list))


@bot.command(name="givememap")
async def givememap(ctx):
    map_list = maps.get_maps([MapState.picked])
    map_choice = random.choice(map_list)
    maps.out_map(map_choice.id)
    await ctx.send("Map Selection: " + map_choice.name)

bot.run(token)