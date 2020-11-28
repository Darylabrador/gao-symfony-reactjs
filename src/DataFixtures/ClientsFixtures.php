<?php

namespace App\DataFixtures;

use App\Entity\Clients;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;

class ClientsFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $faker = Faker\Factory::create('fr_FR');

        for ($i = 1; $i < 6; $i++) {
            $client = new Clients();
            $client->setName($faker->firstNameMale);
            $client->setSurname($faker->lastName);
            $manager->persist($client);
            $manager->flush();
        }
    }
}
