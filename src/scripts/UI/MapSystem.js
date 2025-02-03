export class MapSystem {
    static updateMapUI(location) {
        console.log(`🌍 目前位置: ${location.name}`);
    }

    static initializeMap(mapManager, currentLocation) {
        const mapList = document.querySelector("#maps .list");
        mapList.innerHTML = mapManager.listAllRegions()
            .map(map => `<li>${map.name} <button onclick="gameSystem.switchMap('${map.id}')">前往</button></li>`)
            .join("");

        const initialLocation = mapManager.getMapRegionById(currentLocation);
        if (initialLocation) this.updateMapUI(initialLocation);
    }
}
