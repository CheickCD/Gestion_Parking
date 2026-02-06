#include <stdio.h>
int main(){
    int nombre_place_total , nombre_place_occupe = 0;
   int  choix ;
    printf("entrez les nombres du place de la parking :");
    scanf("%d",&nombre_place_total);
    if(nombre_place_total <= 0){
        printf("nombre_place est invalide\n");
        return 0;
    }
do { 
    printf("\n===gestion du parking ====\n");
    printf("1: entrees d'un vehicule\n");
    printf("2: sortie d'un vehicule\n");
    printf("3: affichez l'etat_parking\n");
    printf("4: quiter\n");
    printf("tapez votre choix\n :");
    scanf("%d",&choix);
    switch (choix){
    case 1:
    if(nombre_place_occupe < nombre_place_total){
        nombre_place_occupe++;
          printf("vehicule entrer avec succes\n");   
    }
else {
    printf("Il ya aucune place libre\n");
}
break;
case 2:
if(nombre_place_occupe > 0){
    nombre_place_occupe--;
    printf("vehicule sortie avec succes\n");
} else{
    printf("la parking  est vide ! sortie imposible\n");
}
break;
case 3:
printf("nombre_place_total:%d\n",nombre_place_total);
printf("nombre_place_occupe :%d\n",nombre_place_occupe);
printf("nombre_place_libre:%d\n",nombre_place_total - nombre_place_occupe);
break;
case 4:
printf("\n programm termine \n");
break;
default:
printf("choix invalide\n");
} 
} while ( choix !=4);
return 0;

}






    
    

